import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import * as Register from './RegisterPage.style';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 에러 메시지 상태
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // 유효성 상태
  const [idValid, setIdValid] = useState(null); // null로 초기화 (중복확인 전 상태)
  const [passwordValid, setPasswordValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    // ID 유효성 검사
    if (idValid === null) {
      setIdError('아이디 중복 확인을 해주세요.');
      isValid = false;
    } else if (!idValid) {
      setIdError('중복된 아이디입니다.');
      isValid = false;
    }

    // 비밀번호 유효성 검사
    if (!passwordValid) {
      setPasswordError(
        '비밀번호는 6~12자의 영문, 숫자, 특수문자를 포함해야 합니다.'
      );
      isValid = false;
    }

    // 비밀번호 재확인 검사
    if (confirmPassword === '') {
      setConfirmPasswordError('비밀번호를 다시 입력해주세요.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    }

    if (!isValid) return; // 유효성 검사 실패 시 회원가입 중단

    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        id,
        password,
        name,
        phone,
      });
      if (response.data.message === 'Registration successful') {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      } else {
        alert(response.data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 중 오류:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleIdDuplicationCheck = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/user/checkDuplicateId',
        { id }
      );
      if (response.data.isDuplicate) {
        setIdValid(false);
        setIdError('중복된 아이디입니다.');
      } else {
        setIdValid(true);
        setIdError(''); // 에러 메시지 초기화
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      setIdError('아이디를 입력해주세요.');
    }
  };

  const handlePasswordValidation = () => {
    const isValid =
      password.length >= 6 &&
      password.length <= 12 &&
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    setPasswordValid(isValid);
    if (!isValid) {
      setPasswordError(
        '비밀번호는 6~12자의 영문, 숫자, 특수문자를 포함해야 합니다.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmValidation = () => {
    if (confirmPassword === '') {
      setConfirmPasswordError('비밀번호를 다시 입력해주세요.');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <Register.RegisterPageLayout>
      <Register.LogoCircle>
        <Register.SubLogoCircle />
      </Register.LogoCircle>
      <Register.RegisterTitle>회원가입</Register.RegisterTitle>
      <form onSubmit={handleSubmit}>
        {/* 아이디 입력 및 중복확인 */}
        <Register.FormSection>
          <Register.FormInput
            type='text'
            id='id'
            placeholder='아이디 (6-12글자)'
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIdError(''); // 에러 메시지 초기화
              setIdValid(null); // 입력 변경 시 중복 확인 상태 초기화
            }}
          />
          <Register.FormButton
            type='button'
            className='duplicate-btn'
            onClick={handleIdDuplicationCheck}
          >
            중복확인
          </Register.FormButton>
        </Register.FormSection>
        {idError && <Register.ErrorMessage>{idError}</Register.ErrorMessage>}

        {/* 비밀번호 입력 */}
        <Register.FormSection>
          <Register.FormInput
            type='password'
            id='pw'
            placeholder='비밀번호 (6-12글자, 영문자 및 숫자, 특수문자 포함)'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(''); // 에러 메시지 초기화
            }}
            onBlur={handlePasswordValidation}
          />
        </Register.FormSection>
        {passwordError && (
          <Register.ErrorMessage>{passwordError}</Register.ErrorMessage>
        )}

        {/* 비밀번호 확인 */}
        <Register.FormSection>
          <Register.FormInput
            type='password'
            id='pw-ch'
            placeholder='비밀번호 재입력'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError(''); // 에러 메시지 초기화
            }}
            onBlur={handlePasswordConfirmValidation}
          />
        </Register.FormSection>
        {confirmPasswordError && (
          <Register.ErrorMessage>{confirmPasswordError}</Register.ErrorMessage>
        )}

        {/* 이름 입력 */}
        <Register.FormSection>
          <Register.FormInput
            type='text'
            name='name'
            placeholder='이름을 입력하세요'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Register.FormSection>

        {/* 전화번호 입력 */}
        <Register.FormSection>
          <Register.FormInput
            type='text'
            name='phone'
            placeholder='전화번호를 입력하세요'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Register.FormButton type='button' className='verification-btn'>
            인증번호
          </Register.FormButton>
        </Register.FormSection>

        {/* 회원가입 및 취소 */}
        <Register.RegisterSection>
          <Register.RegisterButton type='submit'>
            회원가입
          </Register.RegisterButton>
          <Register.CancelButton
            type='button'
            onClick={() => navigate('/login')}
          >
            취소
          </Register.CancelButton>
        </Register.RegisterSection>
      </form>
    </Register.RegisterPageLayout>
  );
};

export default RegisterPage;
