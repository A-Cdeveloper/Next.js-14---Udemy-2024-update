import SideNavigation from "@/app/_components/SideNavigation";

export const metadata = {
  title: {
    default: "Guest Area",
    template: "%s | Guest Area",
  },
};

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-1 h-full"> {children}</div>
    </div>
  );
}
