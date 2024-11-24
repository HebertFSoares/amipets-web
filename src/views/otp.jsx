import { useState } from "react";
import { api } from "@/lib/apiWrapper";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("verify-otp", {
        otp,
      });

      if (response.status === 200 && response.data.success) {
        console.log("OTP verificado com sucesso", response.data);
      }
    } catch (err) {
      setError("Código OTP inválido. Tente novamente.");
      console.error("Erro ao verificar OTP:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("Text");
    if (pastedOtp.length === 6) {
      setOtp(pastedOtp);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      <section className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border-4 border-[#7DA632]">
          <h3 className="text-2xl font-semibold text-center text-[#4A4A4A] mb-6">Digite o Código OTP</h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    id={`otp-${index}`}
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl border-2 border-[#B7B7B7] rounded-lg focus:ring-[#7DA632] focus:border-[#7DA632] bg-[#F1F1F1] shadow-sm transition duration-300 ease-in-out"
                    placeholder="-"
                    required
                  />
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:bg-[#6b9132] transition duration-200"
                disabled={loading}
              >
                {loading ? "Verificando..." : "Verificar OTP"}
              </button>
            </div>

            <div className="flex justify-center items-center text-sm mt-4">
              <a href="#" className="text-[#7DA632] hover:underline">
                Não recebeu o código? Enviar novamente
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
