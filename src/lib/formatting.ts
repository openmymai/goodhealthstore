// lib/formatting.ts หรือ utils/formatting.ts

/**
 * Formats a number as Thai Baht currency.
 *
 * @param amount The numeric value to format.
 * @param options Optional Intl.NumberFormat options.
 * @returns The formatted currency string (e.g., "฿1,250.50").
 */
export const formatCurrency = (
    amount: number | undefined | null,
    options?: Intl.NumberFormatOptions
): string => {
    // Handle null or undefined input gracefully
    if (amount === null || amount === undefined) {
        // Return a default value or an empty string based on your preference
        // For example, return '฿0.00' or '' or '-'
        return '฿0.00'; // Or return '';
    }

    // Default options for Thai Baht (THB)
    const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2, // แสดงทศนิยม 2 ตำแหน่งเสมอ
        maximumFractionDigits: 2,
        // currencyDisplay: 'symbol', // 'symbol' is default, can use 'code' (THB) or 'name' (Thai baht)
    };

    // Merge default options with any provided options
    const formatOptions = { ...defaultOptions, ...options };

    // Use Intl.NumberFormat for proper localization
    const formatter = new Intl.NumberFormat('th-TH', formatOptions); // 'th-TH' for Thai locale

    return formatter.format(amount);
};

// Optional: Function to format without decimals (common for Baht display)
export const formatCurrencyWhole = (
    amount: number | undefined | null,
    options?: Intl.NumberFormatOptions
): string => {
     if (amount === null || amount === undefined) {
        return '฿0'; // Or return '';
    }
    const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0, // ไม่แสดงทศนิยม
        maximumFractionDigits: 0,
    };
     const formatOptions = { ...defaultOptions, ...options };
     const formatter = new Intl.NumberFormat('th-TH', formatOptions);
     return formatter.format(amount);
}