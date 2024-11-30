import { useState, useEffect } from 'react';
import { api } from '@/lib/apiWrapper';
import { useNavigate } from 'react-router-dom';

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
    } else {
      setError('E-mail não encontrado. Certifique-se de que está logado.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await api.post('verify-otp', { otp, email });

      if (response.status === 201) {
        console.log('OTP verificado com sucesso', response.data);
        setMessage('Sua conta foi verificada com sucesso! Faça login para continuar.');
        navigate("/login");
      }
    } catch (err) {
      setError('Código OTP inválido. Tente novamente.');
      console.error('Erro ao verificar OTP:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData('Text');
    if (pastedOtp.length === 6) {
      setOtp(pastedOtp);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF7F2] overflow-hidden">
      <div className="w-full max-w-md sm:max-w-xl bg-white p-8 sm:p-10 rounded-2xl shadow-xl border-4 border-[#7DA632]">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-[#4A4A4A] mb-6">
          Digite o Código OTP
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="grid grid-cols-6 gap-4 sm:gap-6 justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  id={`otp-${index}`}
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('');
                    newOtp[index] = e.target.value;
                    setOtp(newOtp.join(''));
                  }}
                  onPaste={handlePaste}
                  className="w-12 h-12 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl border-2 border-[#B7B7B7] rounded-lg focus:ring-[#7DA632] focus:border-[#7DA632] bg-[#F1F1F1] shadow-sm transition duration-300 ease-in-out"
                  placeholder="-"
                  required
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {message && <p className="text-primary-300 text-sm text-center">{message}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-[#7DA632] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-2xl shadow-lg hover:bg-[#6b9132] transition duration-200"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar OTP'}
            </button>
          </div>

          <div className="flex justify-center items-center text-sm mt-3 sm:mt-4">
            <a href="#" className="text-[#7DA632] hover:underline">
              Não recebeu o código? Enviar novamente
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
