"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: Props) {
  // Simple textarea for now — can be replaced with a rich text library
  return (
    <div className="rounded-btn border border-walnut/20 overflow-hidden">
      {/* Toolbar */}
      <div className="flex gap-1 border-b border-walnut/10 bg-walnut/5 p-2">
        <ToolbarButton onClick={() => insertTag("**", "**")} title="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => insertTag("*", "*")} title="Italic">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => insertTag("\n- ", "")} title="List">
          •
        </ToolbarButton>
        <ToolbarButton onClick={() => insertTag("\n## ", "")} title="Heading">
          H
        </ToolbarButton>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full resize-none bg-white p-4 text-sm outline-none"
        placeholder="Product description..."
      />

      <div className="border-t border-walnut/10 bg-walnut/5 px-4 py-2">
        <p className="text-xs text-muted">
          Supports Markdown formatting
        </p>
      </div>
    </div>
  );

  function insertTag(before: string, after: string) {
    onChange(value + before + "text" + after);
  }
}

function ToolbarButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="grid h-8 w-8 place-items-center rounded hover:bg-walnut/10 text-sm"
    >
      {children}
    </button>
  );
}
