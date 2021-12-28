import { NOCONTENT } from "../../constants/index";
import { CardBody , Icon , Filename , CardBodyContent} from "./style";

const FileContent = ({filename , uniqueData}: any) => {

    const { files } = uniqueData;
    let content : any;
    let myContentArray;
  
    if (files ) {
      Object.values(files).map((file: any) => {
        filename = file.filename;
        content = file.content;
      });
      myContentArray = content.split(" \n");
    }
  

    const UserFileContent =
    myContentArray 
      ? myContentArray?.map((content : any, index : number) => {
          return (
            <span key={index}>
              <p>
                <span style={{ fontWeight: "700", marginRight: "10px" }}>
                  {++index}
                </span>
                {content}
              </p>
            </span>
          );
        })
      : <p> {NOCONTENT} </p>;
  return (
    <>
      <CardBody>
        <Icon className="fas fa-code" />
        <Filename>{filename}</Filename>
      </CardBody>
      <CardBodyContent>{UserFileContent}</CardBodyContent>
    </>
  );
};

export default FileContent;