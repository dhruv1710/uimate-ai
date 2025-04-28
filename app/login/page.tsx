import { signIn, auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Uimate from "@/components/uimate";
import { Github, Chrome } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SignIn() {

  const session = await auth(); // Get session on the server
  if (session?.user) {
    redirect('/analyze'); // Redirect if user is already logged in
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 p-4 h-full w-full"
    >
      <Card className=" w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-2xl lg:text-2xl font-bold mb-4 mx-auto">
            {" "}
            <Uimate />
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Button 
          formAction={async () => {
            "use server";
            await signIn("github");
          }}
          type="submit" className="mx-auto">
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </Button>
          <Button 
          formAction={async () => {
            "use server";
            await signIn("google");
          }}
          type="submit" className="mx-auto">
            <Chrome className="mr-2 h-5 w-5" />
            Google
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
