import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@lib/mongo/clientPromise";



export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string || "",
      clientSecret: process.env.GITHUB_SECRET as string || ""
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      const client = await clientPromise;
      const db = client.db("songwritingApp");
      const collection = db.collection("userData");
      
      if (trigger === "signIn" || trigger === "signUp") {
        const count = await collection.countDocuments({ 
          userId: user.id
        });

        if (count === 0) {
          let newUserData = {
            userId: user.id,
            name: user.name,
            role: "user",
            projects: { data: [] }
          }
  
          await collection.insertOne(newUserData);
        }
      }

      // if (user?.id) {
      //   token.userId = user.id;
      // }

      return token;
    }
  }
}