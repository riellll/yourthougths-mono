import { FC, Fragment } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Button from './Button';
import ParamLink from './ParamLink';

interface ModalProps {
  name: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'center' | 'left';
}

const Modal: FC<ModalProps> = ({ name, children, variant = 'center', className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const isOpen = searchParams.get(name) === '1';

  const closeModal = () => {
    searchParams.delete(name);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-400 bg-opacity-10 transition-opacity" />
          </TransitionChild>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6',
                variant === 'center' ? 'sm:align-middle' : 'sm:align-start',
                className
              )}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <CloseButton name={name} />
              </div>
              {children}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

interface CloseButtonProps {
  name: string;
}

const CloseButton: FC<CloseButtonProps> = ({ name }) => {
  return (
    <ParamLink
      params={{ [name]: '0' }}
      className="absolute top-4 right-4 z-10 border-10 border-white"
    >
      <Button className="p-2 rounded-full" aria-label="close modal">
        <XMarkIcon className="w-4 h-4" />
      </Button>
    </ParamLink>
  );
};

export default Modal;