"use client";

import * as React from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMainMenu() {
  const pathname = usePathname();
  const params = useParams();

  const components = [
    {
      href: `/${params.storeId}`,
      title: "Dashboard",
      active: pathname === `/${params.storeId}`,
      description: " Visualizador prático de histórico de vendas, receita e estoque.",
    },
    {
      href: `/${params.storeId}/orders`,
      title: "Vendas",
      active: pathname === `/${params.storeId}/orders`,
      description: "Tabela com o histórico de vendas e compras pendentes.",
    },
    {
      href: `/${params.storeId}/billboards`,
      title: "Campanhas",
      active: pathname === `/${params.storeId}/billboards`,
      description: "Todos os grupos de campanhas existentes nessa loja.",
    },
    
    {
      href: `/${params.storeId}/settings`,
      title: "Configurações",
      active: pathname === `/${params.storeId}/settings`,
      description:
        "Modifique o nome ou delete sua loja. Confira sua chave de API principal.",
    }
  ];

  const routes = [
    {
      title: "Produtos",
      href: `/${params.storeId}/products`,
      active: pathname === `/${params.storeId}/products`,
      description:
        "Lista de todos os produtos da loja atual.",
    },
    {
      title: "Categorias",
      href: `/${params.storeId}/categories`,
      active: pathname === `/${params.storeId}/categories`,
      description:
        "Crie, edite ou delete categorias.",
    },
    {
      title: "Tamanhos",
      href: `/${params.storeId}/sizes`,
      active: pathname === `/${params.storeId}/sizes`,
      description:
        "Padronize a unidade medida que irá aparecer em seu catálogo.",
    },
    {
      title: "Comodos",
      href: `/${params.storeId}/rooms`,
      active: pathname === `/${params.storeId}/rooms`,
      description:
        "Quantidade de comodos ou quartos.",
    },
    {
      title: "Banheiros",
      href: `/${params.storeId}/bathrooms`,
      active: pathname === `/${params.storeId}/bathrooms`,
      description:
        "Quantidade de banheiros dos imóveis.",
    },
    {
      title: "Cores",
      href: `/${params.storeId}/colors`,
      active: pathname === `/${params.storeId}/colors`,
      description:
        "Catálogo de cores da área externa.",
    },
    {
      title: "Tipo de anúncio",
      href: `/${params.storeId}/adtypes`,
      active: pathname === `/${params.storeId}/adtypes`,
      description:
        "Crie a TAG que o tipo de anúncio poderá receber.",
    },
  ];

  return (
    <NavigationMenu className="pl-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Início</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li className="row-span-4 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                <Image
                  src="/images/genie.png"
                  alt="Logo Genie"
                  width={70}
                  height={70}
                />
                <div className="mb-2 mt-4 text-lg font-medium">Bem-vindo(a)!</div>
                <p className="text-sm leading-tight text-muted-foreground">
                Sou o Genie, serei o gerente do seu e-commerce e auxiliar de desenvolvimento web.
                </p>
              </li>

              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {routes.map((route) => (
                <ListItem
                  key={route.title}
                  title={route.title}
                  href={route.href}
                >
                  {route.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
