import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";

const InputComparison = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [editableDivValue, setEditableDivValue] = useState("");
  const [selectedWhiteSpace, setSelectedWhiteSpace] = useState("normal");
  const [singleLineEllipsis, setSingleLineEllipsis] = useState(false);
  const [multiLineEllipsis, setMultiLineEllipsis] = useState(false);

  const whiteSpaceOptions = [
    "normal",
    "nowrap",
    "pre",
    "pre-wrap",
    "pre-line",
    "break-spaces",
  ];

  const handleEditableDivChange = (e: any) => {
    setEditableDivValue(e.target.innerHTML);
  };

  const copyTemplate = () => {
    // 創建一個臨時的 textarea 元素
    const textArea = document.createElement("textarea");
    textArea.value = "@ @@  @@@";

    // 將 textarea 添加到文檔中
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    // 選中並複製文字
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Failed to copy template:", err);
    }

    // 清理：移除臨時元素
    document.body.removeChild(textArea);
  };

  const getEllipsisStyles = () => {
    const styles: any = {
      overflow: "hidden",
    };
    
    if (singleLineEllipsis) {
      styles.width = "100%";
      styles.textOverflow = "ellipsis";
      
    } else if (multiLineEllipsis) {
      styles.display = "-webkit-box";
      styles.WebkitLineClamp = "1";
      styles.WebkitBoxOrient = "vertical";
    }

    return styles;
  };

  const DisplaySection = ({ title, value }: { title: string; value: string }) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>顯示在 Input</Label>
          <input
            type="text"
            value={value}
            readOnly
            className="w-full border p-2 rounded"
            style={{
              whiteSpace: selectedWhiteSpace,
              ...getEllipsisStyles(),
            }}
          />
        </div>

        <div>
          <Label>顯示在 Textarea</Label>
          <textarea
            value={value}
            readOnly
            className="w-full border p-2 rounded"
            style={{
              whiteSpace: selectedWhiteSpace,
              ...getEllipsisStyles(),
            }}
          />
        </div>

        <div>
          <Label>顯示在 Editable Div</Label>
          <div
            className="border p-2 rounded bg-white"
            style={{
              whiteSpace: selectedWhiteSpace,
              ...getEllipsisStyles(),
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      </div>

      <div className="mt-2">
        <Label>原始值</Label>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-w-[600px]">
          {JSON.stringify(value)}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 w-full">
      {/* 側邊欄 */}
      <div className="w-80 space-y-4 flex-shrink-0">
        {/* 顯示設定 Card */}
        <Card className="w-full sticky top-4">
          <CardHeader>
            <CardTitle>顯示設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>White-space</Label>
                <Select
                  value={selectedWhiteSpace}
                  onValueChange={setSelectedWhiteSpace}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select white-space" />
                  </SelectTrigger>
                  <SelectContent>
                    {whiteSpaceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>單行縮略</Label>
                <Switch
                  checked={singleLineEllipsis}
                  onCheckedChange={(checked) => {
                    setSingleLineEllipsis(checked);
                    if (checked) setMultiLineEllipsis(false);
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>多行縮略 (1行)</Label>
                <Switch
                  checked={multiLineEllipsis}
                  onCheckedChange={(checked) => {
                    setMultiLineEllipsis(checked);
                    if (checked) setSingleLineEllipsis(false);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 輸入區域 Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>輸入區域</span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyTemplate}
                className="flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                <span>複製範本</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Input</Label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="在這裡輸入..."
              />
            </div>

            <div>
              <Label>Textarea</Label>
              <textarea
                className="w-full border p-2 rounded"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="在這裡輸入..."
                rows={4}
              />
            </div>

            <div>
              <Label>Editable Div</Label>
              <div
                className="border p-2 rounded min-h-[100px] bg-white"
                contentEditable
                onInput={handleEditableDivChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>補充</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p>
                在 Textarea 中，如果使用 <code>white-space: pre-wrap;</code>，
                會導致 <code>pre-wrap</code> 被忽略，只會顯示 <code>pre</code>
                的效果。
              </p>
              <p>&amp;nbsp; ：空格</p>
              <p>\t ：tab製表符</p>
              <p>\n ：換行</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要內容區 */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>輸入方式比較</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <DisplaySection title="Input 的值" value={inputValue} />
            <Separator />
            <DisplaySection title="Textarea 的值" value={textareaValue} />
            <Separator />
            <DisplaySection
              title="Editable Div 的值"
              value={editableDivValue}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputComparison;
