import Image from "../../../../components/Image/Image";
import BlogNote from "../BlogNote/BlogNote";
import BlogWarning from "../BlogWarning/BlogWarning";
import CodeBlock from "../CodeBlock/CodeBlock";

const reactComponentWhiteList: { [key: string]: any } = {
    'img': Image,
    'note': BlogNote,
    'warn': BlogWarning,
    'bbb': CodeBlock
};

export default reactComponentWhiteList;
