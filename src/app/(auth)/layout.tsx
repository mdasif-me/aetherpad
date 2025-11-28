interface IAuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <div>
      <nav className='w-full bg-primary text-white'>Auth Navbar</nav>
      <main>{children}</main>
      <footer className='w-full bg-gray-800 text-white'>Auth Footer</footer>
    </div>
  );
};

export default AuthLayout;
