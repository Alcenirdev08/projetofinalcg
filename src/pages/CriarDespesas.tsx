import React, { useState } from 'react';
import * as S from "./styles";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const CriarDespesas = () => {
  const [user] = useAuthState(auth);

  const [form, setForm] = useState({
    descricao: "",
    categoria: "",
    valor: "",
    tipo: "entrada",
    data: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar a mensagem de sucesso
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const despesaData = {
      descricao: form.descricao,
      categoria: form.categoria,
      valor: form.valor,
      tipo: form.tipo,
      data: form.data,
      userId: user?.uid
    }
    
    setIsLoading(true);

    try {
      console.log(despesaData);
      
      const request = await fetch("https://controle-de-gastos-back-end.onrender.com/despesas", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(despesaData)
      })

      const response = await request.json();

      console.log("Resposta da API:", response);

      setIsSubmitted(true);

      setForm({
        descricao: "",
        categoria: "",
        valor: "",
        tipo: "entrada",
        data: ""
      })
  
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao enviar despesa: ", error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <S.Container>
      <S.Title>Criar Nova Despesa</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <S.Input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
        />
        <S.Input
          name="valor"
          placeholder="Valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
        />
        <S.Select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </S.Select>
        <S.Input
          name="data"
          placeholder="Data"
          type="date"
          value={form.data}
          onChange={handleChange}
        />

        {/* Exibir a mensagem de sucesso */}
        {isSubmitted && <S.SuccessMessage>Despesa enviada com sucesso!</S.SuccessMessage>}

        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default CriarDespesas;