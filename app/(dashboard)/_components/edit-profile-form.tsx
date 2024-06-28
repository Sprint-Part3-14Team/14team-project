import ImageInputField from '@/app/components/image-input-field';

export default function EditProfileForm() {
  return (
    <div className="mt-6 rounded-lg bg-white p-5">
      <p className="text-xl font-bold md:text-2xl">프로필</p>
      <form action="" className="mt-6 md:mt-8">
        <ImageInputField />
      </form>
    </div>
  );
}
