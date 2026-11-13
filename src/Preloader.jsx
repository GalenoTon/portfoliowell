import React, { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader({ isLoading, loadProgress }) {
  // As duas partes do nome
  const parte1Raw = "W.";
  const parte2Raw = " GALENO";
  const nomeCompleto = parte1Raw + parte2Raw;

  // Estados separados para as duas partes digitadas
  const [textoParte1, setTextoParte1] = useState('');
  const [textoParte2, setTextoParte2] = useState('');

  // Efeito de máquina de escrever orgânico e sequencial
  useEffect(() => {
    let i = 0; // Índice geral de caracteres digitados
    
    const digitar = () => {
      if (i < nomeCompleto.length) {
        if (i < parte1Raw.length) {
          // Digitando a parte 1 (AQUELE)
          setTextoParte1(parte1Raw.slice(0, i + 1));
        } else {
          // Digitando a parte 2 (TON), baseada no índice geral
          const indiceParte2 = i - parte1Raw.length + 1;
          setTextoParte2(parte2Raw.slice(0, indiceParte2));
        }
        i++;
        // Tempo aleatório entre 50ms e 200ms para simular digitação humana
        setTimeout(digitar, Math.random() * 170 + 50);
      }
    };

    // Inicia a digitação após um pequeno respiro
    const timer = setTimeout(digitar, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`aq-cinematic-wrapper ${!isLoading ? 'is-finalizado' : ''}`}>
      
      {/* Portas de Fundo (Abertura Dramática) */}
      <div className="aq-door aq-door-top"></div>
      <div className="aq-door aq-door-bottom"></div>

      {/* Conteúdo Central Cinematográfico */}
      <div className="aq-cinematic-content">
        
        {/* Título com Efeito Máquina de Escrever e Cores Separadas */}
        <div className="aq-typewriter-text">
          <span className="aq-name-base">{textoParte1}</span>
          <span className="aq-name-accent">{textoParte2}</span>
          <span className="aq-cursor"></span>
        </div>
        
        {/* Barra de Progresso Minimalista */}
        <div className="aq-minimal-progress-container">
          <div 
            className="aq-minimal-progress-fill"
            style={{ width: `${loadProgress}%` }}
          ></div>
        </div>
        
        {/* Número do Progresso Sutil */}
        <div className="aq-progress-number">
          {Math.round(loadProgress)}%
        </div>

      </div>
    </div>
  );
}