import { cn } from "@workspace/ui/lib/utils";

type PageHeaderTitleProps = {
  title: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

type PageHeaderDescriptionProps = {
  description: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

type PageHeaderProps = {
  headerProps?: PageHeaderTitleProps;
  descriptionProps?: PageHeaderDescriptionProps;
};

type PageHeaderRootProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type PageContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function PageHeaderComponent({ headerProps, descriptionProps }: PageHeaderProps) {
  return (
    <PageHeaderRoot>
      {headerProps && <PageHeaderTitle {...headerProps} />}
      {descriptionProps && <PageHeaderDescription {...descriptionProps} />}
    </PageHeaderRoot>
  );
}

function PageHeaderRoot({ children, ...headerRootProps }: PageHeaderRootProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 px-4 justify-center",
        "h-page-header",
        headerRootProps?.className,
      )}
      {...headerRootProps}
    >
      {children}
    </div>
  );
}

function PageHeaderTitle({ title, ...headerProps }: PageHeaderTitleProps) {
  return (
    <h1
      className={cn(
        "text-lg font-bold text-gray-900 dark:text-gray-50",
        headerProps?.className,
      )}
      {...headerProps}
    >
      {title}
    </h1>
  );
}

function PageHeaderDescription({
  description,
  ...descriptionProps
}: PageHeaderDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm/6 text-gray-500 dark:text-gray-500",
        descriptionProps?.className,
      )}
      {...descriptionProps}
    >
      {description}
    </p>
  );
}

function PageContainer({ children, ...containerProps }: PageContainerProps) {
  return (
    <div className="min-h-[calc(100vh-theme(height.app-header))]" {...containerProps}>
      {children}
    </div>
  );
}

const Page = {
  HeaderRoot: PageHeaderRoot,
  HeaderTitle: PageHeaderTitle,
  HeaderDescription: PageHeaderDescription,
  HeaderComponent: PageHeaderComponent,
  Container: PageContainer,
};

export default Page;
