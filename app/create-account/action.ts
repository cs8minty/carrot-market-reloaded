"use server";

import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const checkUserName = (username: string) => !username.includes(" ");

const checkPassword = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => password === confirm_password;

const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: "유저명은 글자여야 해요!",
                required_error: "유저명을 입력해주세요!",
            })
            .toLowerCase()
            .trim()
            .refine(checkUserName, "띄워쓰기는 안되요!"),
        email: z.string().email("이메일 형식이 아니에요!").toLowerCase(),
        password: z
            .string()
            .min(PASSWORD_MIN_LENGTH, "너무 짧아요!!")
            .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH, "너무 짧아요!!"),
    })
    .refine(checkPassword, {
        message: "두 비밀번호가 같아야 해!",
        path: ["confirm_password"],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
