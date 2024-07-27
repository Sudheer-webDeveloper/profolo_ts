import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from "phosphor-react/dist";

interface UserInfo {
  userId: string;
  name: string;
  profileImg: { src: string };
  isVerified: boolean;
  city?: string;
}

interface ProfileCardProps {
  userInfo: UserInfo;
  verifiedButton?: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userInfo, verifiedButton }) => {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-3 w-full">
      <div
        className="flex_start items-center gap-2 cursor-pointer"
        onClick={() => router.push(`/profile/${userInfo.userId}`)}
      >
        <Image
          alt={userInfo.name}
          src={userInfo?.profileImg.src || ""}
          width={80}
          height={80}
          className="object-contain"
        />

        <div className="flex-col flex items-start h-full justify-center gap-[2px]">
          {verifiedButton || (
            <span
              className={`bg-[#DDF2E4] text-[#1AA94A] w-[60px] flex items-center justify-center text-[10px] p-1 rounded-sm`}
            >
              {userInfo.isVerified ? "Verified" : "Un Verified"}
            </span>
          )}

          <p className="font-normal"> {userInfo.name} </p>
          <p className="flex g-2 items-center justify-center text-sm">
            <span className="text-[#515151] mr-[1px]">
              <MapPin size={15} />
            </span>
            {userInfo?.city}
          </p>
        </div>
      </div>

      {verifiedButton || (
        <span className="user_verified w-full text-center py-1.5 text-[16px] rounded-sm">
          Verification Report
        </span>
      )}
    </section>
  );
};

export default ProfileCard;

