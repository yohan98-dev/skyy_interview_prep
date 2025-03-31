import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { dummyInterviews } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
function Page() {
  console.log('what an i doing here');
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Get Interview Ready with Skyy-Prep. AI-Powered Mock Interviews &
            Feedback
          </h2>
          <p className="text-lg">
            Ace your next interview with personalized mock interviews and
            AI-generated feedback. Sign up now to unlock your potential!
          </p>
          <Button asChild className="btn-primary">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* <p>You haven&apos;t started any interviews yet.</p> */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {/* <p>There are no interviews available at the moment.</p> */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;
