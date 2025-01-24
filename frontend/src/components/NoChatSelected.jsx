import { MessageSquare } from "lucide-react";

function NoChatSelected() {
  return (
    <>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-neutral-100 dark:bg-zinc-900">
        <div className="max-w-md text-center space-y-6">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
              >
                <MessageSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-300 " />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">Bienvenido al chat de Exchange Hub</h2>
          <p className="text-zinc-500">
            Selecciona una conversación para empezar a chatear
          </p>
        </div>
      </div>
    </>
  );
}

export default NoChatSelected;
