import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import * as yup from "yup";
import { toast } from "react-toastify";

import { ContainerButton } from "../../components/Button/styles";
import LogoImg from "../../assets/Logo 1.svg";
import { useNavigate } from "react-router-dom";

import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  Form,
  InputContainer,
  Link
} from "./styles";


export function Register() {
  const navigate = useNavigate()
  const schema = yup
    .object({
      name: yup.string().required("Nome é obrigatório"),
      email: yup
        .string()
        .email("Digite um e-mail válido")
        .required("O e-mail é obrigatório"),
      password: yup
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Digite uma senha"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas devem ser iguais.")
        .required("Confirma sua senha"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        "/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
        },
      );
      if (status === 201) {
        setTimeout(() =>{
          navigate("/login")
        },2000)
        toast.success("Conta criado com sucesso!");
      } else if (status === 409) {
        toast.error("E-mail já cadastrado");
      }else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Falha no Sistema! Tente Novamente. 😕")
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={LogoImg} alt="logo-img" />
      </LeftContainer>

      <RightContainer>
        <Title> Criar Conta </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Name</label>
            <input type="text" {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label htmlFor="">Senha</label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirmar Senha</label>
            <input type="passaword" {...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>

          <ContainerButton type="submit">Criar Conta</ContainerButton>
        </Form>
        <p>
          Já possui conta? <Link to={"/login"}>Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
