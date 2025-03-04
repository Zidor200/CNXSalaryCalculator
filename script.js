// Constants
const TRANSPORT_ALLOWANCE = 20.000;
const PRESENCE_ALLOWANCE = 6.080;
const ATTENDANCE_BONUS = 190.000;
const MEAL_ALLOWANCE_DAILY = 6.700;
const GROUP_INSURANCE_RATE = 0.0755;
const CNSS_RATE = 0.0968;
const CSS_RATE = 0.0045;
const WORKING_HOURS = 176;
const MINIMUM_SENIORITY_MONTHS = 9;
const SUNDAY_RATE = 25.000; // Fixed rate per Sunday

// IRPP Tax Brackets (Annual)
const IRPP_BRACKETS = [
    { min: 0, max: 5000, rate: 0 },
    { min: 5000, max: 20000, rate: 0.26 },
    { min: 20000, max: 30000, rate: 0.28 },
    { min: 30000, max: 50000, rate: 0.32 },
    { min: 50000, max: Infinity, rate: 0.35 }
];

// Add translations object
const translations = {
    en: {
        title: "Concentrix Salary Calculator",
        baseComponents: "Base Components",
        baseSalary: "Base Salary",
        absenceDays: "Absence Days",
        halftimeRegime: "HalfTime Regime",
        seniority: "Seniority",
        years: "Years",
        months: "Months",
        fixedAllowances: "Fixed Allowances",
        transportAllowance: "Transport Allowance (Fixed)",
        presenceAllowance: "Presence Allowance (Fixed)",
        attendanceBonus: "Attendance Bonus",
        bonuses: "Bonuses",
        languageBonus: "Language Bonus",
        frenchOnly: "French Only",
        englishOnly: "English Only",
        englishFrench: "English + French",
        otherLanguages: "Other Languages",
        publicHolidays: "Paid Public Holidays (1-5 days)",
        nightShiftHours: "Night Shift Hours",
        productivityBonus: "Productivity Bonus",
        sundaysWorked: "Number of Sundays Worked (25 TND/Sunday)",
        automaticAllowances: "Automatic Allowances",
        mealAllowance: "Meal Allowance (6.7 TND × Working Days)",
        groupInsurance: "Group Insurance (7.55% of Total Income)",
        calculate: "Calculate Salary",
        salaryBreakdown: "Salary Breakdown",
        grossSalary: "Gross Salary",
        cnssContribution: "CNSS Contribution (9.68%)",
        taxableSalary: "Taxable Salary",
        irppTax: "IRPP Tax",
        cssContribution: "CSS (0.45%)",
        totalDeductions: "Total Deductions",
        netSalary: "Net Salary",
        finalNetPayable: "Final Net Payable"
    },
    fr: {
        title: "Calculateur de Salaire Concentrix",
        baseComponents: "Composants de Base",
        baseSalary: "Salaire de Base",
        absenceDays: "Jours d'Absence",
        halftimeRegime: "Régime Mi-temps",
        seniority: "Ancienneté",
        years: "Années",
        months: "Mois",
        fixedAllowances: "Indemnités Fixes",
        transportAllowance: "Indemnité de Transport (Fixe)",
        presenceAllowance: "Indemnité de Présence (Fixe)",
        attendanceBonus: "Prime d'Assiduité",
        bonuses: "Primes",
        languageBonus: "Prime de Langue",
        frenchOnly: "Français Uniquement",
        englishOnly: "Anglais Uniquement",
        englishFrench: "Anglais + Français",
        otherLanguages: "Autres Langues",
        publicHolidays: "Jours Fériés Payés (1-5 jours)",
        nightShiftHours: "Heures de Nuit",
        productivityBonus: "Prime de Rendement",
        sundaysWorked: "Nombre de Dimanches Travaillés (25 TND/Dimanche)",
        automaticAllowances: "Indemnités Automatiques",
        mealAllowance: "Indemnité de Repas (6.7 TND × Jours Travaillés)",
        groupInsurance: "Assurance Groupe (7.55% du Revenu Total)",
        calculate: "Calculer le Salaire",
        salaryBreakdown: "Détail du Salaire",
        grossSalary: "Salaire Brut",
        cnssContribution: "Cotisation CNSS (9.68%)",
        taxableSalary: "Salaire Imposable",
        irppTax: "Impôt IRPP",
        cssContribution: "CSS (0.45%)",
        totalDeductions: "Total des Retenues",
        netSalary: "Salaire Net",
        finalNetPayable: "Net à Payer"
    }
};

// Helper function to format numbers
function formatNumber(number) {
    return number.toFixed(3);
}

// Update the IRPP calculation function with the new detailed steps
function calculateIRPP(annualTaxableSalary) {
    let annualIRPP = 0;

    // Helper function to calculate tax for a specific amount and rate
    function calculateTaxForAmount(amount, rate) {
        return amount * (rate / 100);
    }

    if (annualTaxableSalary <= 5000) {
        // First bracket: 0-5000 TND at 0%
        annualIRPP = 0;
    }
    else if (annualTaxableSalary <= 10000) {
        // Second bracket: 5000-10000 TND at 15%
        annualIRPP = calculateTaxForAmount(annualTaxableSalary - 5000, 15);
    }
    else if (annualTaxableSalary <= 20000) {
        // Third bracket: 10000-20000 TND at 25%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(annualTaxableSalary - 10000, 25);
    }
    else if (annualTaxableSalary <= 30000) {
        // Fourth bracket: 20000-30000 TND at 30%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(10000, 25) + // Third bracket
                     calculateTaxForAmount(annualTaxableSalary - 20000, 30);
    }
    else if (annualTaxableSalary <= 40000) {
        // Fifth bracket: 30000-40000 TND at 33%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(10000, 25) + // Third bracket
                     calculateTaxForAmount(10000, 30) + // Fourth bracket
                     calculateTaxForAmount(annualTaxableSalary - 30000, 33);
    }
    else if (annualTaxableSalary <= 50000) {
        // Sixth bracket: 40000-50000 TND at 36%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(10000, 25) + // Third bracket
                     calculateTaxForAmount(10000, 30) + // Fourth bracket
                     calculateTaxForAmount(10000, 33) + // Fifth bracket
                     calculateTaxForAmount(annualTaxableSalary - 40000, 36);
    }
    else if (annualTaxableSalary <= 70000) {
        // Seventh bracket: 50000-70000 TND at 38%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(10000, 25) + // Third bracket
                     calculateTaxForAmount(10000, 30) + // Fourth bracket
                     calculateTaxForAmount(10000, 33) + // Fifth bracket
                     calculateTaxForAmount(10000, 36) + // Sixth bracket
                     calculateTaxForAmount(annualTaxableSalary - 50000, 38);
    }
    else {
        // Final bracket: Above 70000 TND at 40%
        annualIRPP = calculateTaxForAmount(5000, 15) + // Second bracket
                     calculateTaxForAmount(10000, 25) + // Third bracket
                     calculateTaxForAmount(10000, 30) + // Fourth bracket
                     calculateTaxForAmount(10000, 33) + // Fifth bracket
                     calculateTaxForAmount(10000, 36) + // Sixth bracket
                     calculateTaxForAmount(20000, 38) + // Seventh bracket
                     calculateTaxForAmount(annualTaxableSalary - 70000, 40);
    }

    // Convert annual IRPP to monthly
    return annualIRPP / 12;
}

// Add a debug function to verify the calculation
function debugIRPP(monthlyTaxableIncome) {
    console.log("=== IRPP Calculation Debug ===");
    const annualTaxableIncome = monthlyTaxableIncome * 12;
    console.log(`Monthly Taxable Income: ${monthlyTaxableIncome.toFixed(3)} TND`);
    console.log(`Annual Taxable Income: ${annualTaxableIncome.toFixed(3)} TND`);

    const monthlyIRPP = calculateIRPP(annualTaxableIncome);
    console.log(`Monthly IRPP: ${monthlyIRPP.toFixed(3)} TND`);
    console.log(`Annual IRPP: ${(monthlyIRPP * 12).toFixed(3)} TND`);
}

// Main calculation function
function calculateSalary() {
    // Get input values
    const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
    const absenceDays = parseInt(document.getElementById('absenceDays').value) || 0;
    const isHalftime = document.getElementById('halftimeRegime').checked;
    const seniorityYears = parseInt(document.getElementById('seniorityYears').value) || 0;
    const seniorityMonths = parseInt(document.getElementById('seniorityMonths').value) || 0;
    const languageBonus = parseFloat(document.getElementById('languageBonus').value) || 0;
    const publicHolidays = parseInt(document.getElementById('publicHolidays').value) || 0;
    const nightShiftHours = parseInt(document.getElementById('nightShiftHours').value) || 0;
    const productivityRate = parseFloat(document.getElementById('productivityBonus').value) || 0;
    const sundaysWorked = parseInt(document.getElementById('sundaysWorked').value) || 0;

    // Calculate regime multiplier
    const regime = isHalftime ? 0.5 : 1;

    // Apply regime to base salary and related calculations
    const adjustedBaseSalary = baseSalary * regime;
    const WORKING_DAYS = 22* regime;
    // Calculate total seniority in months
    const totalMonths = (seniorityYears * 12) + seniorityMonths;

    // Calculate daily rate using adjusted base salary
    const dailyRate = (adjustedBaseSalary + TRANSPORT_ALLOWANCE + PRESENCE_ALLOWANCE) / WORKING_DAYS;

    // Calculate hourly rate (daily rate / 8)
    const hourlyRate = dailyRate / 8;

    // Calculate allowances and bonuses with regime adjustment
    const attendanceBonus = absenceDays > 0 ? 0 : (ATTENDANCE_BONUS * regime);
    const publicHolidaysAmount = dailyRate * publicHolidays;
    const nightShiftBonus = hourlyRate * nightShiftHours;
    const productivityBonus = adjustedBaseSalary * productivityRate;
    const mealAllowance = MEAL_ALLOWANCE_DAILY * (WORKING_DAYS - absenceDays);

    // Calculate total Sundays bonus (25 TND per Sunday)
    const sundaysBonus = SUNDAY_RATE * sundaysWorked;

    // Update Sunday bonus display
    document.getElementById('sundayRate').textContent = formatNumber(sundaysBonus) + ' TND';

    // Calculate total income before group insurance
    const totalIncome = adjustedBaseSalary +
        TRANSPORT_ALLOWANCE +
        PRESENCE_ALLOWANCE +
        attendanceBonus +
        languageBonus +
        publicHolidaysAmount +
        nightShiftBonus +
        productivityBonus +
        mealAllowance +
        sundaysBonus;

    // Calculate group insurance based on total income if eligible
    const groupInsurance = totalMonths >= 9 ? totalIncome * GROUP_INSURANCE_RATE : 0;

    // Update group insurance display and disable if not eligible
    const groupInsuranceInput = document.getElementById('groupInsurance');
    groupInsuranceInput.value = formatNumber(groupInsurance);
    if (totalMonths < 9) {
        groupInsuranceInput.classList.add('disabled');
        if (!document.getElementById('insuranceNote')) {
            const noteDiv = document.createElement('div');
            noteDiv.id = 'insuranceNote';
            noteDiv.className = 'insurance-note';
            noteDiv.textContent = 'Group Insurance requires 9 months seniority';
            groupInsuranceInput.parentNode.appendChild(noteDiv);
        }
    } else {
        groupInsuranceInput.classList.remove('disabled');
        const note = document.getElementById('insuranceNote');
        if (note) note.remove();
    }

    const absenceDeduction = dailyRate * absenceDays;

    // Calculate Gross Salary
    const grossSalary = totalIncome + groupInsurance - absenceDeduction;

    // Calculate CNSS base (Gross Salary - Automatic Allowances)
    const cnssBase = grossSalary - (mealAllowance + groupInsurance);
    const cnssContribution = cnssBase * CNSS_RATE;

    // Calculate Taxable Salary
    const taxableSalary = grossSalary - cnssContribution;

    // Calculate IRPP and CSS
    const irppTax = calculateIRPP(taxableSalary * 12);
    const cssContribution = taxableSalary * CSS_RATE;

    // Calculate Total Deductions
    const totalDeductions = cnssContribution + irppTax + cssContribution;

    // Calculate Net Salary
    const netSalary = grossSalary - totalDeductions;

    // Calculate Final Net Payable
    const automaticAllowances = mealAllowance + groupInsurance;
    const netPayable = netSalary - automaticAllowances;

    // Update displays
    document.getElementById('holidayRate').textContent = formatNumber(dailyRate) + ' TND';
    document.getElementById('nightShiftRate').textContent = formatNumber(hourlyRate) + ' TND';
    document.getElementById('mealAllowance').value = formatNumber(mealAllowance);
    document.getElementById('productivityAmount').textContent = formatNumber(productivityBonus) + ' TND';

    // Update results
    document.getElementById('grossSalary').textContent = formatNumber(grossSalary) + ' TND';
    document.getElementById('cnssContribution').textContent = formatNumber(cnssContribution) + ' TND';
    document.getElementById('taxableSalary').textContent = formatNumber(taxableSalary) + ' TND';
    document.getElementById('irppTax').textContent = formatNumber(irppTax) + ' TND';
    document.getElementById('cssContribution').textContent = formatNumber(cssContribution) + ' TND';
    document.getElementById('totalDeductions').textContent = formatNumber(totalDeductions) + ' TND';
    document.getElementById('netSalary').textContent = formatNumber(netSalary) + ' TND';
    document.getElementById('netPayable').textContent = formatNumber(netPayable) + ' TND';
}

// Event Listeners
document.getElementById('salaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateSalary();
});

// Update the baseSalary event listener to remove Sunday rate update since it's now fixed
document.getElementById('baseSalary').addEventListener('input', function() {
    const baseSalary = parseFloat(this.value) || 0;
    const dailyRate = (baseSalary + TRANSPORT_ALLOWANCE + PRESENCE_ALLOWANCE) / WORKING_DAYS;
    const hourlyRate = dailyRate / 8;

    document.getElementById('holidayRate').textContent = formatNumber(dailyRate) + ' TND';
    document.getElementById('nightShiftRate').textContent = formatNumber(hourlyRate) + ' TND';
    updateProductivityBonus(baseSalary);
});

document.getElementById('productivityBonus').addEventListener('change', function() {
    const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
    updateProductivityBonus(baseSalary);
});

// Add new helper function for productivity bonus calculation
function updateProductivityBonus(baseSalary) {
    const productivityRate = parseFloat(document.getElementById('productivityBonus').value) || 0;
    const productivityAmount = baseSalary * productivityRate;
    document.getElementById('productivityAmount').textContent =
        formatNumber(productivityAmount) + ' TND';
}

// Initialize readonly fields
document.getElementById('transport').value = TRANSPORT_ALLOWANCE.toFixed(3);
document.getElementById('presence').value = PRESENCE_ALLOWANCE.toFixed(3);
document.getElementById('attendanceBonus').value = ATTENDANCE_BONUS.toFixed(3);

// Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize seniority inputs with validation
    const seniorityYears = document.getElementById('seniorityYears');
    const seniorityMonths = document.getElementById('seniorityMonths');

    // Validate months (0-11)
    seniorityMonths.addEventListener('input', function() {
        let value = parseInt(this.value) || 0;
        if (value > 11) {
            this.value = 11;
        } else if (value < 0) {
            this.value = 0;
        }
    });

    // Validate years (non-negative)
    seniorityYears.addEventListener('input', function() {
        let value = parseInt(this.value) || 0;
        if (value < 0) {
            this.value = 0;
        }
    });

    // Calculate total seniority in years (can be used for future calculations)
    function calculateTotalSeniority() {
        const years = parseInt(seniorityYears.value) || 0;
        const months = parseInt(seniorityMonths.value) || 0;
        return years + (months / 12);
    }
});

// Update event listener for halftime regime
document.getElementById('halftimeRegime').addEventListener('change', function() {
    calculateSalary(); // Recalculate when regime changes
});

// Update the changeLanguage function
function changeLanguage(lang) {
    console.log('Changing language to:', lang); // Debug log

    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        console.log('Translating:', key); // Debug log

        if (translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'OPTION') {
                element.text = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Handle select options separately
    const languageSelect = document.getElementById('languageBonus');
    if (languageSelect) {
        Array.from(languageSelect.options).forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key && translations[lang][key]) {
                option.text = translations[lang][key];
            }
        });
    }

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('lang' + lang.toUpperCase()).classList.add('active');
}

// Add these event listeners at the end of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners for language buttons
    document.getElementById('langEN').addEventListener('click', function() {
        console.log('English button clicked'); // Debug log
        changeLanguage('en');
    });

    document.getElementById('langFR').addEventListener('click', function() {
        console.log('French button clicked'); // Debug log
        changeLanguage('fr');
    });

    // Initialize with English
    changeLanguage('en');
});