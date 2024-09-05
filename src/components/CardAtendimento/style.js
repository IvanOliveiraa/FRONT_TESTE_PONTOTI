import styled from "styled-components";
export const ContainerCard = styled.li`{
  display: inline-block;
  vertical-align: top;
  margin-bottom:10px;
  width: 170px;
  height: 120px;
  transition: transform .2s;
  border: 5px solid #1a1a1a;
  
  text-decoration: none;
  border-radius: 5px;
  background:#1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  :hover{
    box-shadow: rgba(0, 0, 0, 0.3) 1px 2px 6px, rgba(0, 0, 0, 0.5) 0px 2px 4px;
  }
  
}`;
export const HeaderCard = styled.div`{
  font-weight: bold;
  font-size:16px;
  font-size:12px;
  width:100%;
  text-align:center;
  justify: center;
  color: ${(props) => (props.prioridade === 1 ? "#fce6b1" : "white")};

}`;
export const Bodycard = styled.div`{
  
  height: 75%;
  border-radius: 5px;
  font-size:11px;
  width:100%;
  text-align:left;
  background:#292c2e;
  color:#A9A9A9;
  & p{
    padding: 0px 0px 0px 4px;
    
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

  }

}`;