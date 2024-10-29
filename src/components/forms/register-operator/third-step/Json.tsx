import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface JsonProps {
  json?: object;
  flattenedValues: string[];
}

const FieldIndicator: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return isActive && (
    <span className="ml-2 text-sm font-bold text-green-500">
      🆗 Ya esta en uso
    </span>
  )
};

const CustomNode: React.FC<{ node: string; isActive: boolean }> = ({ node, isActive }) => {
  return (
    <span>
      {node} <FieldIndicator isActive={isActive} />
    </span>
  );
};

CustomNode.displayName = "CustomNode";

const customizeNode = (params: {  indexOrName: number | string | undefined; node: string; flattenedValues: string[] }) => {
  const isActive = params.flattenedValues.includes(params.indexOrName!.toString());
  return <CustomNode node={params.node} isActive={isActive} />;
};

export const Json: React.FC<JsonProps> = ({ json, flattenedValues }) => {
  console.log(flattenedValues, 'flattenedValues estiy en Json');
  return (
    <JsonView
      src={json}
      customizeNode={params => {
        if (typeof params.node === 'string' || params.node === null || params.node === undefined || typeof params.node === 'number' || typeof params.node === 'boolean') {
          return customizeNode({ ...params, flattenedValues });
        }
      }}
      collapsed={1}
      style={{ whiteSpace: "pre-wrap" }}
      theme="winter-is-coming"
      collapseStringsAfterLength={8}
      displaySize={true}
    />
  );
};
