import { useState, useRef } from "react";

enum Operadores{
    sumar, restar, multiplicar, dividir
}

const useCalculadora = () => {
    
    const [numeroAnterior,setNumeroAnterior] = useState('0');
    const [numero,setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumeroAnterior('0');
        setNumero('0');
    };

    const armarNumero = (numTexto: string)  => {

        // verificar si existe un punto
        if(numero.includes('.') && numTexto === '.') return;

        if(numero.startsWith('0') || numero.startsWith('-0')){

            // punto decimal
            if(numTexto === '.'){
                setNumero(numero + numTexto);
                // evaluar si es otro cero y hay un punto
            }else if(numTexto === '0' && numero.includes('.')){
                setNumero(numero + numTexto);
                // evaluar si es diferente de cero y no tiene un punto
            }else if(numTexto !== '0' && !numero.includes('.')){
                setNumero(numTexto);
            }else if(numTexto === '0' && !numero.includes('.')){
                setNumero(numero);
            }else{
                setNumero(numero + numTexto);
            }
        }else{
            setNumero(numero + numTexto);
        }

    };

    const numNegativo = () => {
        if(numero.includes('-')){
            setNumero(numero.replace('-',''));
        }else{
            setNumero('-' + numero);
        }
    };

    const btnDelete = () => {
        
        let negativo = ''
        let numTemp = numero;
        if(numero.includes('-')){
            negativo = '-';
            numTemp = numero.substring(1);
        }

        if(numTemp.length > 1){
            setNumero(negativo + numTemp.slice(0,-1))
        }else{
            setNumero('0')
        }
    };

    const cambiarNumPorAnterior = () => {
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0.-1))
        }else{
            setNumeroAnterior(numero)
        }
        setNumero('0')
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${num1 + num2}`);
                break;
            case Operadores.restar:
                setNumero(`${num2 - num1}`);
                break;
            case Operadores.multiplicar:
                setNumero(`${num1 * num2}`);
                break;
            case Operadores.dividir:
                setNumero(`${num2 / num1}`);
                break;
        
           
        }

        setNumeroAnterior('0');
    }

    return{
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        numNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular
    }
}

export default useCalculadora;
