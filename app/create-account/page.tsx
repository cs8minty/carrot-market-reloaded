"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { createAccount } from "./action";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">
                    가입하시려면 아래의 양식을 채워주세요!
                </h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <Input
                    name="username"
                    type="text"
                    placeholder="유저명"
                    required
                    errors={state?.fieldErrors.username}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="이메일"
                    required
                    errors={state?.fieldErrors.email}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    required
                    errors={state?.fieldErrors.password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <Input
                    name="confirm_password"
                    type="password"
                    placeholder="비밀번호 확인"
                    required
                    errors={state?.fieldErrors.confirm_password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <Button text="가입하기" />
            </form>
            <SocialLogin />
        </div>
    );
}
