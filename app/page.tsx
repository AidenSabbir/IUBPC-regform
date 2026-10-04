// app/dashboard/page.tsx
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSession();

  if (!session) {
    // Internal path or absolute external URL
    //redirect('/login'); 
    redirect('https://join.iubpc.org');
  }

  return <div>Dashboard Content</div>;
}