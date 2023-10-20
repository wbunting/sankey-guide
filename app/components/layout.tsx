import SidebarComponents from "@/components/sidebar-components";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div
          dir="ltr"
          className="relative h-full py-6 pl-8 pr-6 overflow-hidden lg:py-8"
        >
          <div className="h-full w-full rounded-[inherit]">
            <div className="table min-w-full">
              <div className="w-full">
                <SidebarComponents />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <article className="mx-auto prose-sm prose prose-stone sm:prose-base lg:prose-lg dark:prose-invert">
          {children}
        </article>
      </main>
    </div>
  );
}
