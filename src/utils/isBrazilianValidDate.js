
export function isValidBrazilianDate(dateString) {
    // A expressão regular para verificar se a data tem o formato DD/MM/YYYY
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) {
        return false; // Se a data não corresponder ao formato DD/MM/YYYY
    }

    // Extrair o dia, mês e ano da data
    const [, day, month, year] = match;

    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    // Verificar se o mês está dentro do intervalo 1-12
    if (monthInt < 1 || monthInt > 12) {
        return false; // Mês inválido
    }

    // Verificar se o dia está dentro do intervalo válido para o mês e ano
    const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
    if (dayInt < 1 || dayInt > daysInMonth) {
        return false; // Dia inválido para o mês
    }

    return true;
}