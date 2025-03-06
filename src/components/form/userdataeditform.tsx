"use client";

import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { UserData } from "@/@types/accounts/userdata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, RotateCcw } from "lucide-react";
import { PartialUserData, PartialUserDataSchema } from "@/@types/accounts/userdata";
import ToggleButton from "@/components/button/checkbutton";

interface UserDataEditFormProps {
  session: Session;
  data: UserData | null;
}

const household_size = [
  { label: "1명", value: 1 },
  { label: "2명", value: 2 },
  { label: "3명", value: 3 },
  { label: "4명", value: 4 },
  { label: "5명", value: 5 },
  { label: "6명", value: 6 },
  { label: "7명", value: 7 },
  { label: "8명 이상", value: 8 },
] as const;

export default function UserDataEditForm({ data, session }: UserDataEditFormProps) {
  const form = useForm<PartialUserData>({
    resolver: zodResolver(PartialUserDataSchema),
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = (values: PartialUserData) => {
    console.log(values);
    const response = fetch("/api/user/user-data", {
      method: "POST",
      body: JSON.stringify(values),
      redirect: "follow",
      credentials: "include",
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="overcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가구원 수입</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="가구원 총 수입을 입력해주세요..." defaultValue={field.value} />
                </FormControl>
                <FormMessage />
                <FormDescription>가구의 총 수입은 ""에서 확인할 수 있습니다.</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="household_size"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>가구원 수</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                        {field.value && field.value !== 0 ? household_size.find((value) => value.value === field.value)?.label : "가구원 수를 선택하세요"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {household_size.map((value) => (
                            <CommandItem
                              value={value.label}
                              key={value.label}
                              onSelect={() => {
                                form.setValue("household_size", value.value);
                              }}
                            >
                              {value.label}
                              <Check className={cn("ml-auto", value.value === field.value ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academic_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>학력</FormLabel>
                <FormControl>
                  <fieldset>
                    <div className="flex flex-wrap gap-2">
                      <ToggleButton
                        type="radio"
                        name={field.name}
                        text="초등학생"
                        onChange={field.onChange}
                        id="as1"
                        value={1}
                        defaultChecked={field.value === 1}
                      />
                      <ToggleButton
                        type="radio"
                        name={field.name}
                        text="중학생"
                        onChange={field.onChange}
                        id="as2"
                        value={2}
                        defaultChecked={field.value === 2}
                      />
                      <ToggleButton
                        type="radio"
                        name={field.name}
                        text="고등학생"
                        onChange={field.onChange}
                        id="as3"
                        value={3}
                        defaultChecked={field.value === 3}
                      />
                      <ToggleButton
                        type="radio"
                        name={field.name}
                        text="대학(원)생"
                        onChange={field.onChange}
                        id="as4"
                        value={4}
                        defaultChecked={field.value === 4}
                      />
                      <ToggleButton
                        type="radio"
                        name={field.name}
                        text="해당없음"
                        onChange={field.onChange}
                        id="as0"
                        value={0}
                        defaultChecked={field.value === 0}
                      />
                    </div>
                  </fieldset>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormLabel>가구원 수</FormLabel>
            <div className="flex flex-wrap gap-2">
              <FormField
                control={form.control}
                name="multicultural"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="다문화가족" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="north_korean"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="북한이탈주민" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="single_parent_or_grandparent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="한부모·조손가정" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="homeless"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="무주택세대" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="new_resident"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="신규전입" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="multi_child_family"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="다자녀가구" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="extend_family"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="확대가족" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disable"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="장애인" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="veteran"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="국가보훈대상자" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disease"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton text="질병·질환자" defaultChecked={field.value} onChange={field.onChange} id={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full space-x-4">
            <Button type="reset" size="lg" variant="ghost">
              <RotateCcw />
              초기화
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              저장하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
