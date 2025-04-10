'use client';
import React from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { toast } from 'sonner';
import FormFields from './FormField';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
// import { Input } from '@/components/ui/input';

const authFormSchrma = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(4) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchrma(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success('Account created successfully, Please sign in..');
        router.push('/sign-in');
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error('Failed to sign in, please try again');
          return;
        }
        await signIn({
          email,
          idToken,
        });
        toast.success('Signed in successfully.');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  }

  const isSignIn = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-content">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Skyy-Prep </h2>
        </div>
        <h3>Practice Job Interviews With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormFields
                control={form.control}
                name="name"
                lable="Username"
                placeholder="Username"
              />
            )}
            <FormFields
              control={form.control}
              name="email"
              lable="Email"
              placeholder="Enter Your Email"
              type="email"
            />
            <FormFields
              control={form.control}
              name="password"
              lable="Password"
              placeholder="Enter Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'New to Skyy-Prep? ' : 'Already have an account? '}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="font-bold text-user-primary ml-1">
            {isSignIn ? 'Create an Account' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
