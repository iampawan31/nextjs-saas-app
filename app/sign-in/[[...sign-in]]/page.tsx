import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <main className="flex items-center justify-between">
      <SignIn />
    </main>
  )
}

export default Page
