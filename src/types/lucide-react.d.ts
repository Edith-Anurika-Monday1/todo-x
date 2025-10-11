declare module "lucide-react" {
    import * as React from "react";
  
    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: string | number;
      color?: string;
      strokeWidth?: string | number;
      absoluteStrokeWidth?: boolean;
    }
  
    export type Icon = React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
    
    export const icons: { [key: string]: Icon };
  
    
    export const X: Icon;
    export const Check: Icon;
    export const Trash: Icon;
    export const Pencil: Icon;
    
    export {};
  }
  