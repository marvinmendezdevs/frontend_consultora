import type { FormGeneralType, SchemaFormType } from "@/types/forms.types"
import type { UseMutationResult } from "@tanstack/react-query";
import { useForm, type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form";
import { Link } from "react-router";

type FormsType = {
  form: FormGeneralType
  answer?: AnswersType
  mutation: UseMutationResult<void, Error, AnswersType, unknown>
}

type AnswersType = Record<string, string>

type InputType = {
  question: SchemaFormType
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const QUESTION_COMPONENTS: Record<string, React.FC<InputType>> = {
  unique: UniqueSelectionInput,
  text: TextInput,
};

function Forms({ form, answer, mutation }: FormsType) {

  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: answer ?? {}
  });

  console.log(answer)

  const questions = form.schema;
  const onSubmit = (data: AnswersType) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      {questions.map(question => {
        const InputComponent = QUESTION_COMPONENTS[question.type];

        return (
          <div className="p-2" key={question.id}>
            <p>{question.id}. {question.statement}</p>

            {InputComponent ? (
              <InputComponent question={question} register={ register } errors={ errors } />
            ) : (
              <p className="text-red-500 text-sm">
                Tipo de pregunta no soportado: {question.type}
              </p>
            )}
          </div>
        )
      })}

      <div className="flex justify-end gap-2">
        <Link className="bg-red-500 text-white py-1 px-2 rounded" to={"/"}>
          Cancelar
        </Link>
        <button className="bg-indigo-500 text-white py-1 px-2 rounded" type="submit">
          Guardar respuesta
        </button>
      </div>
    </form>
  )
}

function UniqueSelectionInput({ question, register, errors }: InputType) {

  return (
    <div className="flex flex-col gap-2 mt-2">
      {question.answer_options.map((answer: string, index: number) => {
        const inputId = `q_${question.id}_opt_${index}`;

        return (
            <div className="flex items-center gap-2" key={inputId}>
              <input
                type="radio"
                value={answer}
                id={inputId}
                {...register(`question_${question.id}`, { required: question.required })}
              />
              <label htmlFor={inputId} className="cursor-pointer select-none">
                {answer}
              </label>
            </div>
        )
      })}
      {errors[`question_${question.id}`] && <p className="text-xs text-red-500">El campo es obligatorio</p>}
    </div>
  )
};

function TextInput({ question, register, errors }: InputType) {

  return (
    <>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="Escribe tu respuesta aquí..."
        rows={3}
        {...register(`question_${question.id}`, { required: question.required })}
      />
      {errors[`question_${question.id}`] && <p className="text-xs text-red-500">El campo es obligatorio</p>}
    </>
  );
}

export default Forms