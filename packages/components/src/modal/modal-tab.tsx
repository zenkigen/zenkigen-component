import { Tab, TabItem } from '../tab';

type Props = {
  tabItems: { id: string; label: string }[];
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

export function ModalTab({ tabItems, selectedTab, setSelectedTab }: Props) {
  return (
    <div className="mt-2 w-full">
      <Tab>
        {tabItems.map((item) => (
          <TabItem key={item.id} id={item.id} isSelected={selectedTab === item.id} onClick={setSelectedTab}>
            {item.label}
          </TabItem>
        ))}
      </Tab>
    </div>
  );
}
