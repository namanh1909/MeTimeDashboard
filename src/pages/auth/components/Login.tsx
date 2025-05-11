import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorMessage from '@/components/ui/error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthQuery } from '@/features/auth/hooks/use-auth-query';
import { loginSchema } from '@/features/auth/schemas';
import { loginRequestType } from '@/features/auth/services/type';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { loginMutation } = useAuthQuery();

  const onSubmit = (data: loginRequestType) => {
    loginMutation.mutate(data);
  };

  return (
    <Tabs defaultValue="merchant" className="w-[350px] mx-auto mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="merchant">Merchant</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>

      {/* Merchant Login */}
      <TabsContent value="merchant">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign in as Merchant</CardTitle>
            <CardDescription>
              Enter your email & password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" {...register('email')} />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message as string} />
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <ErrorMessage message={errors.password.message as string} />
                  )}
                </div>
                {/* <div className="flex flex-col items-start">
                  <Button variant="link" className="p-0 h-auto">
                    Forgot Password?
                  </Button>
                </div> */}
              </div>
              <CardFooter className="flex justify-between w-full">
                <div className="w-full">
                  <Button className="w-full mt-3" type="submit">
                    Sign In
                  </Button>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Admin Login */}
      <TabsContent value="admin">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign in as Admin</CardTitle>
            <CardDescription>
              Enter your username & password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Sign In</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;
