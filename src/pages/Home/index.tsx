import { Play } from "phosphor-react";
import {
  CountDownButton,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  TaskInputCount,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, "Informe o nome da tarefa completo"),
  minutesFor: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no mínimo 60 minutos"),
});

interface newFormData {
  id: string;
  task: string;
  minutesFor: number;
}

export function Home() {
  //Armazenar os ciclos, por isso o []
  const [cycles, setCycles] = useState<newFormData[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
    },
  });

  function handleCreateNewCycle(data: newFormData) {
    const newCycle: newFormData = {
      //uma maneira simples de gerar id sem instalar biblioteca
      id: String(new Date().getTime()),
      task: data.task,
      minutesFor: data.minutesFor,
    };

    setCycles((state) => [...state, newCycle]);
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  //countdown
  const totalSeconds = activeCycle ? activeCycle.minutesFor * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0;

  //Calcular para por em tela
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  // Para ter 2 caracteres
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  const task = watch("task");
  const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="Dê um nome ao seu projeto"
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="minutesFor">durante</label>
          <TaskInputCount
            id="minutesFor"
            type="number"
            placeholder="00"
            step={5}
            min={0}
            {...register("minutesFor", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <CountDownButton
          disabled={isSubmitDisable}
          type="submit"
          onClick={() => handleCreateNewCycle}
        >
          <Play size={24} /> Começar
        </CountDownButton>
      </form>
    </HomeContainer>
  );
}
