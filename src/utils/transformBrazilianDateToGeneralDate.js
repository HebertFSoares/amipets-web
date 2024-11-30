
export function transformBrazilianDateToGeneralDate(dateString) {

    const match = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})/);

    // Extrair o dia, mês e ano da data
    const [, day, month, year] = match;

    return new Date(year, month, day);
}