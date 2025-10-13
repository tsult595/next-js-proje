'use client';

// import { Button } from '@/components/ui/button';
// import { useLogoutMutation } from '@/store/auth/authApi';

// export default function Logout() {
//   const [logout, { isLoading }] = useLogoutMutation();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       window.location.href = '/login'; // Или useRouter
//     } catch (err) {
//       console.error('Logout failed:', err);
//     }
//   };

//   return (
//     <Button onClick={handleLogout} disabled={isLoading}>
//       {isLoading ? 'Выход...' : 'Выйти'}
//     </Button>
//   );
// }