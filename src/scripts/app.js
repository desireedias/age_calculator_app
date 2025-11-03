

// ===============================================
// 1. VARIÁVEIS DE REFERÊNCIA (Escopo Global)
// ===============================================
// Botão de Calcular (para adicionar o listener, ou usar o formulário)
const calcButton = document.querySelector('.calculator-btn'); 

// Formulário
const form = document.querySelector('form'); 

// Campos de Input
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

// Elementos Pais (Para adicionar/remover a classe 'error')
const parentDay = inputDay.closest('.form-control-item');
const parentMonth = inputMonth.closest('.form-control-item');
const parentYear = inputYear.closest('.form-control-item');


// Mensagens de Erro (o elemento <small>)
const errorMsgDay = parentDay.querySelector('.error-message');
const errorMsgMonth = parentMonth.querySelector('.error-message');
const errorMsgYear = parentYear.querySelector('.error-message');

// Elementos de Resultado (os spans com os números)
const resultYears = document.querySelector('.result-line:nth-child(1) .result-value');
const resultMonths = document.querySelector('.result-line:nth-child(2) .result-value');
const resultDays = document.querySelector('.result-line:nth-child(3) .result-value');

// ===============================================
// FUNÇÕES AUXILIARES DE ERRO (Escopo Global)
// ===============================================
const setError = (element, message) => {
    element.classList.add('error');
    element.querySelector('.error-message').textContent = message;
};

const removeError = (element) => {
    element.classList.remove('error');
    element.querySelector('.error-message').textContent = '';
};


// ===============================================
// 3. FUNÇÃO DE CÁLCULO
// ===============================================

function calculateAge(day, month, year){
    const today = new Date();
    const birthDate = new Date(year, month -1, day);

    //diferença de tempo em millisegundos
    const diffTime = today.getTime() - birthDate.getTime;

    //calculo dos anos usando data completa
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if(ageDays < 0){
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate()
    }

    if(ageMonths <0){
        ageYears--;
        ageMonths += 12;
    }

    // Atualiza o DOM (Resultado)
    resultYears.textContent = ageYears;
    resultMonths.textContent = ageMonths;
    resultDays.textContent = ageDays;

    inputDay.value = '';
    inputMonth.value = '';
    inputYear.value = '';

    // 2. Limpar o estado visual de erro
    removeError(parentDay);
    removeError(parentMonth);
    removeError(parentYear);
}


// ===============================================
// 2. VALIDAÇÃO LÓGICA DE DATA
// ===============================================
function validateLogicAndCalculate(){
    //1.CONVERSÃO E REFERENCIA
    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year = parseInt(inputYear.value);
    
    const today = new Date();
    const currentYear = today.getFullYear();
    
    //--funções auxiliares de erro
    //as mesmas funções setError e removeError já definidas
    
    //validação 1 - mes e dias válidos
    
    if (month < 1 || month > 12){
        isValid = false;
        setError(parentMonth, 'Deve ser um mês válido');
    } else {
        removeError(parentMonth);
    }
    
    if (day < 1 || day > 31){
        isValid = false;
        setError(parentDay, 'Deve ser um dia válido');
    } else {
        removeError(parentDay);
    }
    
    //validação 2 - ano no passado (checa se o ano digitado é maior que o atual)
    if (year > currentYear){
        isValid = false;
        setError(parentYear, 'deve estar no passado');
    } else if (year === currentYear) {
        const inputDate = new Date(year, month - 1, day); //month-1 pois o js pois o mes é baseado em 0-11 (jan-0, fev-1, etc)
        if (inputDate > today){
            isValid = false;
            setError(parentYear, 'Deve estar no passado');
        }else{
            removeError(parentYear);
        }
    }else{
        removeError(parentYear);
    };
    
    //validação 3 - se o dia é válido para o mes e ano
    //o new Date(year, month, 0) --> retorna o último dia do mes anterior fornecido pelo usuário
    const daysInMonth = new Date(year, month, 0).getDate();
    
    if (day > daysInMonth){
        isValid = false;
        setError(parentDay, 'deve ser uma data válida')
    }
    
    if (isValid){
        calculateAge(day, month, year);
    }
}



// ===============================================
// 4. FUNÇÃO PRINCIPAL (Validação de Vazio)
// ===============================================
// 2. Função de Validação 
function validateAndCalculate(event) {


    let isValid = true; // Flag para rastrear se todos os campos são válidos
    
    
    // 3. Validação de Campo Vazio (Exemplo para o dia)
    if (inputDay.value.trim() === '') {
        isValid = false;
        setError(parentDay, "Este campo é obrigatório");

    } else {
        removeError(parentDay);
    }


    // validação mes
    if(inputMonth.value.trim() === ''){
        isValid = false;
        setError(parentMonth, "Este campo é obrigatório");
    } else {
        removeError(parentMonth);
    }

    //validação year
    if(inputYear.value.trim()=== ''){
        isValid = false;
        setError(parentYear, "Este campo é obrigatório");
    } else {
        removeError(parentYear);
    }

    if (isValid) {
        validateLogicAndCalculate();
    }
    
};


  // 4. Configuração do Event Listener
    calcButton.addEventListener('click', validateAndCalculate);
    let isValid = true;