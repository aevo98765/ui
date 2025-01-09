import React from 'react';
import { SkillSeedExample } from '@/types';
import { FormFieldGroupExpandable, FormFieldGroupHeader, Button, FormGroup, TextArea, ValidatedOptions, FormHelperText, HelperText, HelperTextItem } from '@patternfly/react-core';
import { ExternalLinkAltIcon, TrashIcon, ExclamationCircleIcon, PlusCircleIcon } from '@patternfly/react-icons';

interface Props {
  seedExamples: SkillSeedExample[];
  handleContextInputChange: (seedExampleIndex: number, contextValue: string) => void;
  handleContextBlur: (seedExampleIndex: number) => void;
  handleQuestionInputChange: (seedExampleIndex: number, questionValue: string) => void;
  handleQuestionBlur: (seedExampleIndex: number) => void;
  handleAnswerInputChange: (seedExampleIndex: number, answerValue: string) => void;
  handleAnswerBlur: (seedExampleIndex: number) => void;
  addSeedExample: () => void;
  deleteSeedExample: (seedExampleIndex: number) => void;
}

const SkillsSeedExample: React.FC<Props> = ({
  seedExamples,
  handleContextInputChange,
  handleContextBlur,
  handleQuestionInputChange,
  handleQuestionBlur,
  handleAnswerInputChange,
  handleAnswerBlur,
  addSeedExample,
  deleteSeedExample
}) => {
  return (
    <FormFieldGroupExpandable
      style={{ justifyContent: 'left' }}
      isExpanded
      toggleAriaLabel="Details"
      header={
        <FormFieldGroupHeader
          titleText={{
            text: (
              <p>
                Seed Examples <span style={{ color: 'red' }}>*</span>
              </p>
            ),
            id: 'seed-examples-id'
          }}
          titleDescription={
            <p>
              Add seed examples with question and answer pair and related context (optional). A minimum of five seed examples are required.{' '}
              <a href="https://docs.instructlab.ai/taxonomy/skills/#skills-yaml-examples" target="_blank" rel="noopener noreferrer">
                {' '}
                Learn more about seed examples
                <ExternalLinkAltIcon style={{ padding: '3px' }}></ExternalLinkAltIcon>
              </a>
            </p>
          }
        />
      }
    >
      {seedExamples.map((seedExample: SkillSeedExample, seedExampleIndex: number) => (
        <FormFieldGroupExpandable
          isExpanded={seedExample.isExpanded}
          toggleAriaLabel="Details"
          key={seedExampleIndex}
          header={
            <FormFieldGroupHeader
              titleText={{
                text: (
                  <p>
                    Seed Example {seedExampleIndex + 1} {seedExample.immutable && <span style={{ color: 'red' }}>*</span>}
                  </p>
                ),
                id: 'nested-field-group1-titleText-id'
              }}
              actions={
                !seedExample.immutable && (
                  <Button icon={<TrashIcon />} variant="plain" aria-label="Remove" onClick={() => deleteSeedExample(seedExampleIndex)} />
                )
              }
            />
          }
        >
          <FormGroup isRequired key={seedExampleIndex + '-question'} label="Question">
            <TextArea
              key={seedExampleIndex * 10 + 2}
              isRequired
              type="text"
              aria-label={`Question ${seedExampleIndex + 1}`}
              placeholder={`Enter question ${seedExampleIndex + 1}`}
              value={seedExample.question}
              validated={seedExample.isQuestionValid}
              onChange={(_event, questionValue) => handleQuestionInputChange(seedExampleIndex, questionValue)}
              onBlur={() => handleQuestionBlur(seedExampleIndex)}
            />
            {seedExample.isQuestionValid === ValidatedOptions.error && (
              <FormHelperText key={seedExampleIndex * 100 + 2}>
                <HelperText>
                  <HelperTextItem icon={<ExclamationCircleIcon />} variant={seedExample.isQuestionValid}>
                    {seedExample.questionValidationError || 'Required field '}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
          <FormGroup key={seedExampleIndex + '-context'} label="Context">
            <TextArea
              key={seedExampleIndex * 10 + 1}
              isRequired
              type="text"
              aria-label={`Context ${seedExampleIndex + 1}`}
              placeholder="Enter the context for the question and answer pair. (optional)"
              value={seedExample.context}
              validated={seedExample.isContextValid}
              onChange={(_event, contextValue: string) => handleContextInputChange(seedExampleIndex, contextValue)}
              onBlur={() => handleContextBlur(seedExampleIndex)}
            />
          </FormGroup>
          <FormGroup isRequired key={seedExampleIndex + '-answer'} label="Answer">
            <TextArea
              key={seedExampleIndex * 10 + 3}
              isRequired
              type="text"
              aria-label={`Answer ${seedExampleIndex + 1}`}
              placeholder={`Enter answer ${seedExampleIndex + 1}`}
              value={seedExample.answer}
              validated={seedExample.isAnswerValid}
              onChange={(_event, answerValue) => handleAnswerInputChange(seedExampleIndex, answerValue)}
              onBlur={() => handleAnswerBlur(seedExampleIndex)}
            />
            {seedExample.isAnswerValid === ValidatedOptions.error && (
              <FormHelperText key={seedExampleIndex * 100 + 4}>
                <HelperText>
                  <HelperTextItem icon={<ExclamationCircleIcon />} variant={seedExample.isAnswerValid}>
                    {seedExample.answerValidationError || 'Required field'}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
        </FormFieldGroupExpandable>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button icon={<PlusCircleIcon />} variant="link" type="button" onClick={addSeedExample}>
          Add Seed Example
        </Button>
      </div>
    </FormFieldGroupExpandable>
  );
};

export default SkillsSeedExample;
