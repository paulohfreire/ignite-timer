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

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="Dê um nome ao seu projeto"
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
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <CountDownButton disabled type="submit">
          <Play size={24} /> Começar
        </CountDownButton>
      </form>
    </HomeContainer>
  );
}
