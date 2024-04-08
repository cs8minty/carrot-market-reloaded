"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialState = {
    token: false,
    error: undefined,
};

export default function SMSLogin() {
    const [state, dispatch] = useFormState(smsLogin, initialState);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS 로그인</h1>
                <h2 className="text-xl">
                    휴대전화 번호로 인증코드를 받아 인증합니다
                </h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                {state.token ? (
                    <Input
                        name="token"
                        type="number"
                        placeholder="인증코드"
                        required
                        min={100000}
                        max={999999}
                    />
                ) : (
                    <Input
                        name="phone"
                        type="text"
                        placeholder="휴대전화 번호"
                        required
                        errors={state.error?.formErrors}
                    />
                )}
                <Button
                    text={state.token ? "코드 인증하기" : "인증코드 발송"}
                />
            </form>
        </div>
    );
}
