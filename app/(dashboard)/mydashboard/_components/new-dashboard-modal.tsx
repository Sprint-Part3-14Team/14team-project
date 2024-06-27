import Buttons from '@/app/components/button';
import Modal from '@/app/components/modal';

interface NewDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewDashboardModal({
  isOpen,
  onClose,
}: NewDashboardModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[293px] w-[327px] md:h-[334px] md:w-[540px]"
    >
      <h2 className="text-xl font-bold md:text-2xl">새로운 대시보드</h2>
      <br />
      <form>
        <label
          htmlFor="dashboardName"
          className="text-base font-medium text-gray-700 md:text-lg"
        >
          대시보드 이름
        </label>
        <br />
        <input
          id="inputId"
          type="text"
          placeholder="대시보드 이름을 입력하세요."
        />
        <br />
        <br />
        <div>
          <Buttons
            variant="mobile138x42"
            onClick={onClose}
            className="rounded-lg border border-solid border-gray-300 bg-white text-black"
          >
            취소
          </Buttons>
          <Buttons
            variant="mobile138x42"
            type="submit"
            className="rounded-lg bg-violet-primary text-white"
          >
            생성
          </Buttons>
        </div>
      </form>
    </Modal>
  );
}
