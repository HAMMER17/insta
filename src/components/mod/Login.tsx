"use client"
import { Button } from "../ui/button"
import { Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form"

import useLogin from "@/hooks/useLogin"
import { Toaster } from "../ui/toaster"

interface FormValues {
  email: string
  password: string
}

const Login = ({ setHandleAuth }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { SignIn, loading } = useLogin()
  const onSubmit = handleSubmit((data) => {
    SignIn(data)

  })


  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" alignItems="center" justifyContent={'center'} w={'300px'} minH={'100vh'}>
        <Text fontSize={30} fontFamily={'fantasy'}>Login</Text>
        <Field fontFamily={'fantasy'}
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input variant="subtle" p={2}
            {...register("email", { required: "Email is required" })}
          />
        </Field>
        <Field fontFamily={'fantasy'}
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <Input variant="subtle" p={2}
            {...register("password", { required: "Password is required" })}
          />
        </Field>
        <Button type="submit" p={4} w={'full'} fontFamily={'cursive'} _hover={{ bg: 'blue.500' }}
          bg={'blue'} color={'white'} loading={loading}>Sign In</Button>
        <Text fontFamily={'fantasy'}>Have not you account <Button cursor={'pointer'} p={4}
          m={2} onClick={() => setHandleAuth((pre: any) => !pre)}>Register</Button> </Text>
      </Stack>
      <Toaster />
    </form>
  )
}


export default Login
