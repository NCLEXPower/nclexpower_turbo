import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";
import { useTenantContext } from "../contexts";
import { useRouter } from "../core";

const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href" | "onMouseEnter" | "onTouchStart" | "onClick"
    >,
    Omit<NextLinkProps, "href" | "as"> {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
  href?: NextLinkProps["href"];
}

const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(
    {
      to,
      linkAs,
      href: _,
      replace,
      scroll: __,
      shallow,
      prefetch,
      locale,
      ...other
    },
    ref
  ) {
    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={false}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  }
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href?: NextLinkProps["href"];
  naked?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    naked,
    role: _,
    target,
    ...other
  },
  ref
) {
  const router = useRouter();

  const pathname = typeof href === "string" ? href : href?.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (naked) {
      return (
        <Anchor
          className={className}
          href={addTenantSlug(href)}
          target={target}
          ref={ref}
          {...other}
        />
      );
    }

    return (
      <MuiLink
        className={className}
        href={addTenantSlug(href)}
        ref={ref}
        {...other}
      />
    );
  }

  if (naked) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        to={addTenantSlug(href)}
        target={target}
        linkAs={linkAs ? addTenantSlug(linkAs) : addTenantSlug(href)}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={addTenantSlug(href)}
      {...other}
    />
  );

  function addTenantSlug(path?: string | NextLinkProps["href"]): string {
    return path?.toString() || "";
  }
});
