import type { Meta, StoryObj } from '@storybook/react-vite';
import type { IconName } from '@zenkigen-inc/component-icons';
import { iconElements } from '@zenkigen-inc/component-icons';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../button';
import { Modal } from '../modal';
import { Select } from './select';
import type { SelectOption } from './type';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      description: 'サイズ',
    },
    variant: {
      description: 'バリエーション',
    },
    width: {
      type: 'string',
      description: '幅',
    },
    maxWidth: {
      type: 'string',
      description: '最大幅',
    },
    optionListMaxHeight: {
      type: 'string',
      description:
        'オプションリストの最大高さ。未指定の場合はオプション 8.5 個分（large: 350px、それ以外: 282px）。"none" で制限を解除',
    },
    placeholder: {
      type: 'string',
      description: 'placeholderのテキスト',
    },
    placeholderIcon: {
      options: Object.keys(iconElements)
        .map((iconName) => iconName)
        .concat(['']),
      control: 'select',
      description: 'placeholderのアイコン',
    },
    isOptionSelected: {
      type: 'boolean',
      description: '選択状態の見た目にするかどうか（selectedOption が指定されている場合のみ有効）',
    },
    isError: {
      type: 'boolean',
      description: 'エラー状態',
    },
    isDisabled: {
      type: 'boolean',
      description: '無効化の状態',
    },
    selectedOption: {
      description: '選択されたオプション',
    },
    children: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const optionsList = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'warning' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'volume' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'video' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'user' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'upload' as IconName },
];

const optionsList2 = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  {
    id: '2',
    label: '選択肢B',
    value: 'B',
    icon: 'warning' as IconName,
  },
  { id: '3', label: '選択肢C', value: 'C', icon: 'volume' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'video' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'user' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'upload' as IconName },
];

export const Component: Story = {
  args: {
    // eslint-disable-next-line no-undefined
    placeholderIcon: undefined,
    placeholder: '選択',
    size: 'medium',
    variant: 'outline',
    width: '100%',
    maxWidth: '',
    optionListMaxHeight: '130px',
    selectedOption: { id: '2', label: '選択肢B', value: 'B', icon: 'warning' as IconName },
    isOptionSelected: false,
    isError: false,
    isDisabled: false,
    children: (
      <>
        {optionsList2.map((option) => (
          <Select.Option key={option.id} option={option} />
        ))}
      </>
    ),
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc(args) {
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

    return (
      <div style={{ height: '100px' }}>
        <Select {...args} selectedOption={selectedOption} onChange={(option) => setSelectedOption(option)} />
      </div>
    );
  },
};

export function Base() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);

  return (
    <>
      <div style={{ display: 'grid', rowGap: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            width={140}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            width={140}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

export const IsOptionSelected: Story = {
  args: {
    isOptionSelected: true,
    isError: false,
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    width: {
      table: { disable: true },
    },
    maxWidth: {
      table: { disable: true },
    },
    optionListMaxHeight: {
      table: { disable: true },
    },
    placeholder: {
      table: { disable: true },
    },
    placeholderIcon: {
      table: { disable: true },
    },
    isDisabled: {
      table: { disable: true },
    },
    selectedOption: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  render: function MyFunc(args) {
    const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>({
      id: '3',
      label: '選択肢C',
      value: 'C',
      icon: 'volume' as IconName,
    });
    const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });
    const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });
    const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });

    return (
      <>
        <div style={{ display: 'grid', rowGap: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
        </div>
      </>
    );
  },
};

export const IsError: Story = {
  args: {
    isError: true,
    isOptionSelected: false,
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    width: {
      table: { disable: true },
    },
    maxWidth: {
      table: { disable: true },
    },
    optionListMaxHeight: {
      table: { disable: true },
    },
    placeholder: {
      table: { disable: true },
    },
    placeholderIcon: {
      table: { disable: true },
    },
    isDisabled: {
      table: { disable: true },
    },
    selectedOption: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  render: function MyFunc(args) {
    const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
    const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
    const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
    const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);

    return (
      <>
        <div style={{ display: 'grid', rowGap: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
        </div>
      </>
    );
  },
};

export function MaxWidth() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);
  const maxWidth = 190;

  return (
    <>
      <div>
        <div className="flex flex-col items-start gap-4">
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択選"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            maxWidth={maxWidth}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択選択選択選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

export function MatchListToTrigger() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);

  const longLabelOptions = [
    { id: '1', label: '選択肢A 長いラベルのテスト用テキスト', value: 'A' },
    { id: '2', label: '選択肢B さらに長いラベルのテスト用テキストです', value: 'B' },
    { id: '3', label: '選択肢C', value: 'C' },
    { id: '4', label: '選択肢D 短め', value: 'D' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="typography-label14regular mb-2 text-text01">
          matchListToTrigger: false（デフォルト）- リストはコンテンツに応じて広がる
        </p>
        <Select
          size="medium"
          variant="outline"
          placeholder="選択"
          selectedOption={selectedOption1}
          onChange={(option) => setSelectedOption1(option)}
          width={200}
        >
          {longLabelOptions.map((option) => (
            <Select.Option key={option.id} option={option} />
          ))}
        </Select>
      </div>
      <div>
        <p className="typography-label14regular mb-2 text-text01">
          matchListToTrigger: true - リストはトリガーボタンの幅に固定
        </p>
        <Select
          size="medium"
          variant="outline"
          placeholder="選択"
          selectedOption={selectedOption2}
          onChange={(option) => setSelectedOption2(option)}
          width={200}
          matchListToTrigger
        >
          {longLabelOptions.map((option) => (
            <Select.Option key={option.id} option={option} />
          ))}
        </Select>
      </div>
    </div>
  );
}

/**
 * 裏側の非同期処理でエラーが発生し、Select 操作中に Modal が自動表示されるケースを想定した Story。
 *
 * Story が描画されると以下が自動的に進む:
 * 1. 1秒後に Select の List が自動的に開く
 * 2. 3秒後（Select 表示の2秒後）に Modal が自動的に表示される
 * 3. Modal の表示と同時に Select の List が自動で閉じる
 *
 * 自動で閉じる仕組み:
 * - Modal は `isOpen` が false → true に切り替わる瞬間に `window` へ
 *   `zenkigen-modal-open` カスタムイベントを dispatch する
 * - Select 内部の `useDismissOnModalOpen` フックがそのイベントを listen し、
 *   受信時に自身の List を閉じる setter を呼び出す
 * - 同じ仕組みで Dropdown / SelectSort / Popover / DatePicker（Popover 経由）も
 *   Modal 表示時に自動で閉じる
 *
 * Modal を閉じてもう一度確認したい場合は、Storybook 側でこの Story を再描画する。
 */
function DismissOnModalOpenContent() {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1秒後に Select を自動的に開く
    const openSelectTimer = window.setTimeout(() => {
      const selectButton = containerRef.current?.querySelector<HTMLButtonElement>('button[type="button"]');
      selectButton?.click();
    }, 1000);

    // 3秒後（Select 表示の2秒後）に Modal を自動的に開く
    const openModalTimer = window.setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    return () => {
      window.clearTimeout(openSelectTimer);
      window.clearTimeout(openModalTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded border border-uiBorder01 bg-uiBackgroundBlue p-4">
        <p className="typography-label14bold text-text01">Modal 表示時に Select の List が自動で閉じることを確認する</p>
        <p className="typography-body14regular text-text01">
          1秒後に Select が自動で開き、さらに 2秒後に Modal が表示される。Modal の表示と同時に Select の List
          が閉じれば成功。
        </p>
      </div>
      <Select
        size="medium"
        variant="outline"
        placeholder="選択"
        selectedOption={selectedOption}
        onChange={(option) => setSelectedOption(option)}
        width={240}
      >
        {optionsList.map((option) => (
          <Select.Option key={option.id} option={option} />
        ))}
      </Select>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width={480}>
        <Modal.Header>自動表示された Modal（デモ）</Modal.Header>
        <Modal.Body>
          <div className="px-6 pb-4">
            <p className="typography-body14regular text-text01">
              Modal が表示されました。背景の Select は自動的に閉じています。
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full items-center justify-end">
            <Button variant="outline" size="medium" onClick={() => setIsModalOpen(false)}>
              閉じる
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export const DismissOnModalOpen: Story = {
  render: () => <DismissOnModalOpenContent />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: [
          'Modal 表示時に Select の List が自動で閉じることを確認する Story。',
          '',
          '1秒後に Select が自動で開き、さらに 2秒後に Modal が表示される。Modal の表示と同時に Select の List が閉じれば成功。',
          '',
          '**仕組み**: Modal は `isOpen` が `true` に切り替わる瞬間に `window` へ `zenkigen-modal-open` カスタムイベントを dispatch する。Select 内部の `useDismissOnModalOpen` フックがそれを listen して List を閉じる。同じ仕組みが Dropdown / SelectSort / Popover / DatePicker（Popover 経由）にも横展開されている。',
        ].join('\n'),
      },
    },
  },
};

// 既定の高さ（8.5 個分）でスクロールが発生することを確認するための長いリスト
const longOptionsList: SelectOption[] = Array.from({ length: 12 }, (_, index) => ({
  id: `${index + 1}`,
  label: `選択肢${index + 1}`,
  value: `${index + 1}`,
}));

const captionStyle = { color: '#5a6570', fontSize: '12px', whiteSpace: 'nowrap' } as const;
const columnStyle = { display: 'flex', flexDirection: 'column', gap: '8px' } as const;
const rowStyle = { display: 'flex', alignItems: 'flex-start', gap: '48px' } as const;

function DefaultOptionListMaxHeightContent() {
  const [selectedXSmall, setSelectedXSmall] = useState<SelectOption | null>(null);
  const [selectedSmall, setSelectedSmall] = useState<SelectOption | null>(null);
  const [selectedMedium, setSelectedMedium] = useState<SelectOption | null>(null);
  const [selectedLarge, setSelectedLarge] = useState<SelectOption | null>(null);
  const [selectedWithDeselect, setSelectedWithDeselect] = useState<SelectOption | null>(longOptionsList[9] ?? null);
  const [selectedNone, setSelectedNone] = useState<SelectOption | null>(null);

  return (
    <div style={{ display: 'grid', rowGap: '420px' }}>
      <div style={rowStyle}>
        <div style={columnStyle}>
          <span style={captionStyle}>x-small / 282px</span>
          <Select
            size="x-small"
            placeholder="選択"
            selectedOption={selectedXSmall}
            onChange={(option) => setSelectedXSmall(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={columnStyle}>
          <span style={captionStyle}>small / 282px</span>
          <Select
            size="small"
            placeholder="選択"
            selectedOption={selectedSmall}
            onChange={(option) => setSelectedSmall(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={columnStyle}>
          <span style={captionStyle}>medium / 282px</span>
          <Select
            size="medium"
            placeholder="選択"
            selectedOption={selectedMedium}
            onChange={(option) => setSelectedMedium(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={columnStyle}>
          <span style={captionStyle}>large / 350px</span>
          <Select
            size="large"
            placeholder="選択"
            selectedOption={selectedLarge}
            onChange={(option) => setSelectedLarge(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={columnStyle}>
          <span style={captionStyle}>選択済み（選択解除ボタンを含めて 8.5 個分）</span>
          <Select
            size="medium"
            placeholder="選択"
            selectedOption={selectedWithDeselect}
            onChange={(option) => setSelectedWithDeselect(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={columnStyle}>
          <span style={captionStyle}>optionListMaxHeight=&quot;none&quot;（制限解除・12 件すべて表示）</span>
          <Select
            size="medium"
            placeholder="選択"
            optionListMaxHeight="none"
            selectedOption={selectedNone}
            onChange={(option) => setSelectedNone(option)}
          >
            {longOptionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export const DefaultOptionListMaxHeight: Story = {
  render: () => <DefaultOptionListMaxHeightContent />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: [
          '`optionListMaxHeight` 未指定時の既定の高さを確認する Story（オプション 12 件）。',
          '',
          "既定値はオプション 8.5 個分で、`size` に応じて x-small / small / medium は 282px、large は 350px になる。オプション 1 件の高さが `size='large'` のみ 40px（`h-10`）、それ以外は 32px（`h-8`）のため、上段の 3 つは同じ高さになる。末尾の 0.5 個はスクロールできることを示すためのもの。",
          '',
          '下段左: **選択解除ボタンも 8.5 個に含まれる**ため、選択済みのときは表示されるオプション数がその分減る。開くと選択中の項目（選択肢10）が中央付近へスクロールされる。',
          '',
          '下段右: 高さ制限を外して全件表示したい場合は `optionListMaxHeight="none"` を指定する。',
        ].join('\n'),
      },
    },
  },
};
