"use server";

import { redirect } from "next/navigation";

export async function handleForm(prevState: any, formData: FormData) {
    console.log(prevState);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    redirect("/");
    return {
        errors: ["worng password", "password too short"],
    };
}
