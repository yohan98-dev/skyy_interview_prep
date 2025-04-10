'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 1 week in milliseconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRec = await db.collection('users').doc(uid).get();
    if (userRec.exists) {
      return {
        success: false,
        message: 'User already exists please sign in',
      };
    }
    await db.collection('users').doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error: any) {
    console.error('Error signing up:', error);
    if (error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email already exists ',
      };
    }
    return {
      success: false,
      message: 'Error signing up',
    };
  }
}
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log('Error signing in:', error);
    return {
      success: false,
      message: 'Failed to sign into an account',
    };
  }
}
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });
  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}
