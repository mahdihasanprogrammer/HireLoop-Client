"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineBriefcase } from "react-icons/hi";

import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation'



const SignInPage = () => {

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect')|| "/";
    console.log('redirectTo', redirectTo)


    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const email = e.target.email.value;
            const password = e.target.password.value;

            const { data, error } = await signIn.email({
                email,
                password,
                
            })

            if (error) {
                toast.error(error.message, {
                    icon: <MdErrorOutline className="text-red-500" size={20} />,
                    className: 'error-toast'
                });
            }

            if (data) {
                toast.success("Login successful 🚀", {
                    icon: <FaCheckCircle className="text-cyan-400" size={20} />,
                    className: 'success-toast '
                });

                router.push(redirectTo)
            }
        }
        catch (err) {
            toast.error(err.message || "Something went wrong" ,{
                icon: <MdErrorOutline className="text-red-500" size={20} />,
                className: 'error-toast'
            });
        }
        finally{
            setLoading(false)
        }

    };


    const handleGoogleLogin = () => {
        alert("Google Login Coming Soon");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-6">
            <Card className="w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 rounded-2xl bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 mb-4">
                        <HiOutlineBriefcase className="text-4xl text-cyan-400" />
                    </div>

                    <h1 className="text-3xl font-extrabold">
                        <span className="text-cyan-400">Hire</span>
                        <span className="text-blue-500">Loop</span>
                    </h1>

                    <p className="text-default-500 text-sm text-center mt-2">
                        Sign in to continue your hiring journey
                    </p>
                </div>

                {/* Google Login */}
                <Button onPress={handleGoogleLogin} variant="bordered" className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 font-medium">
                    <FcGoogle size={22} />
                    Continue with Google
                </Button>

                {/* Divider */}
                <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>

                    <div className="relative flex justify-center">
                        <span className="bg-slate-900 px-4 text-xs uppercase text-default-500">
                            OR
                        </span>
                    </div>
                </div>

                {/* Form */}
                <Form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full">

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="mb-1">Email Address</Label>
                        <Input placeholder="john@example.com" classNames={{ inputWrapper: "bg-white/5 border border-white/10 hover:border-cyan-500 transition-colors" }} />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password" >

                        <Label className="mb-1">Password</Label>
                        <Input placeholder="Enter strong password" classNames={{ inputWrapper: "bg-white/5 border border-white/10 hover:border-cyan-500 transition-colors" }} />
                        <FieldError />
                    </TextField>


                    <Button type="submit" className="w-full h-11 text-base font-semibold text-white bg-linear-to-r from-purple-500 via-blue-500 to-indigo-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20">
                          {loading ?  <span>Signing In...</span> : "Login"}
                    </Button>
                </Form>

                {/* Sign In Highlight */}

                <p className="text-sm text-default-500 text-center">
                    Dont have an account?
                    <Link href={`/signup?redirect=${redirectTo}`} className="ml-2 font-bold text-cyan-400 hover:text-cyan-300 transition-colors text-base underline underline-offset-2">
                        Sign Up
                    </Link>
                </p>



            </Card>
        </div>
    );
};

export default SignInPage;