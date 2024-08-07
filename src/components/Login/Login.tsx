import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '@src/lib/schemes/login.schema';
import { fetchLoginUser } from '@src/lib/requests/login.requests';
import s from './Login.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@src/lib/stores/Auth.store';

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { login } = useAuthStore();

  const formDefaultValues: LoginSchemaType = {
    username: '',
    password: '',
  }
  
  const {
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: formDefaultValues,
  })

  const onSubmit: SubmitHandler<LoginSchemaType> = dataForm => {
    setIsloading(true)
    fetchLoginUser({
      login: dataForm.username,
      password: dataForm.password,
    }).then((token) => {
      localStorage.setItem('token', token);
      login();
      setIsloading(false)
    }).catch((error) => {
      if (error) {
        console.error('Ви ввели не вірний пароль або логін');
        setIsloading(false);
      }
    })
  }

  return (
    <section className={s.login_section}>
      <div className={s.login_container} >
        <div className={`${s.left_section}`}>
          <div className={s.login_header}>
            <h1 className={`${s.title} ${s.animation} ${s.a1}`}>З поверненням!</h1>
            <h4 className={`${s.sub_title} ${s.animation} ${s.a2}`}>Вхід у ЗВІЗДАЛЬ</h4>
          </div>
          <form
            className={s.login_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`${s.form_field_group} ${s.animation} ${s.a3}`}>
              <input
                {...register('username')}
                type='text'
                placeholder="Логін"
                className={s.form_field}
              />
            </div>
            <div className={`${s.form_field_group} ${s.animation} ${s.a4}`}>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                className={s.form_field}
              />
              <button
                type='button'
                className={s.btn_swhow_password}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                {!showPassword ? (
                  'Закрите'
                )
                  : (
                    'Відкрите'
                  )}
              </button>
            </div>
            <button
              type="submit"
              className={`${s.login_button} ${s.animation} ${s.a6}`}
            >
              Увійти
            </button>
            {isLoading &&
              <p>Loading...</p>}
          </form>
        </div>
        <div className={s.right_section} />
      </div>
    </section>
  );
}

export default Login;
