import React from 'react';
import { Pregunta, Opcion } from '../../types';

interface QuestionEditorProps {
  preguntas: Pregunta[];
  onUpdate: (preguntas: Pregunta[]) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ preguntas, onUpdate }) => {
  const handleAddQuestion = () => {
    const newQuestion: Pregunta = {
      id: Math.max(0, ...preguntas.map((p) => p.id)) + 1,
      texto: '',
      tipo: 'cerrada',
      orden: preguntas.length + 1,
      opciones: [],
    };
    onUpdate([...preguntas, newQuestion]);
  };

  const handleRemoveQuestion = (id: number) => {
    onUpdate(preguntas.filter((p) => p.id !== id));
  };

  const handleUpdateQuestion = (id: number, updates: Partial<Pregunta>) => {
    onUpdate(
      preguntas.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.tipo && updates.tipo === 'abierta') {
            updated.opciones = [];
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleAddOption = (preguntaId: number) => {
    const pregunta = preguntas.find((p) => p.id === preguntaId);
    if (!pregunta) return;

    const newOption: Opcion = {
      id: Math.max(0, ...(pregunta.opciones?.map((o) => o.id) || [])) + 1,
      pregunta_id: preguntaId,
      texto: '',
      orden: (pregunta.opciones?.length || 0) + 1,
    };

    handleUpdateQuestion(preguntaId, {
      opciones: [...(pregunta.opciones || []), newOption],
    });
  };

  const handleRemoveOption = (preguntaId: number, opcionId: number) => {
    const pregunta = preguntas.find((p) => p.id === preguntaId);
    if (!pregunta) return;

    handleUpdateQuestion(preguntaId, {
      opciones: pregunta.opciones?.filter((o) => o.id !== opcionId),
    });
  };

  const handleUpdateOption = (preguntaId: number, opcionId: number, texto: string) => {
    const pregunta = preguntas.find((p) => p.id === preguntaId);
    if (!pregunta) return;

    handleUpdateQuestion(preguntaId, {
      opciones: pregunta.opciones?.map((o) => (o.id === opcionId ? { ...o, texto } : o)),
    });
  };

  return (
    <div className="question-editor">
      <div className="editor-header">
        <h3>Editor de Preguntas</h3>
        <button onClick={handleAddQuestion} className="ingresar-btn">
          + Agregar Pregunta
        </button>
      </div>

      {preguntas.map((pregunta, index) => (
        <div key={pregunta.id} className="question-item">
          <div className="question-header">
            <span className="question-number">Pregunta {index + 1}</span>
            <button onClick={() => handleRemoveQuestion(pregunta.id)} className="btn-remove">
              ×
            </button>
          </div>

          <div className="form-group">
            <label>Texto de la pregunta:</label>
            <input
              type="text"
              value={pregunta.texto}
              onChange={(e) => handleUpdateQuestion(pregunta.id, { texto: e.target.value })}
              placeholder="Escribe tu pregunta aquí..."
            />
          </div>

          <div className="form-group">
            <label>Tipo de pregunta:</label>
            <select
              value={pregunta.tipo}
              onChange={(e) =>
                handleUpdateQuestion(pregunta.id, { tipo: e.target.value as Pregunta['tipo'] })
              }
            >
              <option value="cerrada">Cerrada (opción única)</option>
              <option value="checkbox">Checkbox (opción múltiple)</option>
              <option value="abierta">Abierta (texto libre)</option>
            </select>
          </div>

          {pregunta.tipo !== 'abierta' && (
            <div className="options-section">
              <div className="options-header">
                <label>Opciones:</label>
                <button onClick={() => handleAddOption(pregunta.id)} className="btn-add-option">
                  + Agregar Opción
                </button>
              </div>
              {pregunta.opciones?.map((opcion, optIndex) => (
                <div key={opcion.id} className="option-item">
                  <span className="option-number">{optIndex + 1}.</span>
                  <input
                    type="text"
                    value={opcion.texto}
                    onChange={(e) => handleUpdateOption(pregunta.id, opcion.id, e.target.value)}
                    placeholder="Texto de la opción..."
                  />
                  <button
                    onClick={() => handleRemoveOption(pregunta.id, opcion.id)}
                    className="btn-remove-option"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {preguntas.length === 0 && (
        <div className="empty-state">
          <p>No hay preguntas configuradas. Haz clic en "Agregar Pregunta" para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;
