import { useTypedSelector } from './redux';

export const useAuth = () => {
  const user = useTypedSelector((state) => state.user);
  const { email, id } = user;
  return {
    isAuth: !!email,
    email,
    id,
  };
};
